#include "AppDelegate.h"
#include "jsbindings/GameAnalyticsJS.hpp"

#include "cocos2d.h"

#include "cocos/scripting/js-bindings/manual/ScriptingCore.h"
#include "cocos/scripting/js-bindings/manual/jsb_module_register.hpp"
#include "cocos/scripting/js-bindings/manual/jsb_global.h"
#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS) && PACKAGE_AS
#include "SDKManager.h"
#include "jsb_anysdk_protocols_auto.hpp"
#include "manualanysdkbindings.hpp"
using namespace anysdk::framework;
#endif

USING_NS_CC;
#ifdef SDKBOX_ENABLED
#include "PluginAdMobJS.hpp"
#include "PluginAdMobJSHelper.h"
#endif
#ifdef SDKBOX_ENABLED
#include "PluginSdkboxAdsJS.hpp"
#include "PluginSdkboxAdsJSHelper.h"
#endif

AppDelegate::AppDelegate()
{
}

AppDelegate::~AppDelegate()
{
    ScriptEngineManager::destroyInstance();
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS) && PACKAGE_AS
    SDKManager::getInstance()->purge();
#endif
}

void AppDelegate::initGLContextAttrs()
{
    GLContextAttrs glContextAttrs = {8, 8, 8, 8, 24, 8};
    
    GLView::setGLContextAttrs(glContextAttrs);
}

bool AppDelegate::applicationDidFinishLaunching()
{
#if CC_TARGET_PLATFORM == CC_PLATFORM_IOS && PACKAGE_AS
    SDKManager::getInstance()->loadAllPlugins();
#endif
    // initialize director
    auto director = Director::getInstance();
    auto glview = director->getOpenGLView();
    if(!glview) {
#if(CC_TARGET_PLATFORM == CC_PLATFORM_WP8) || (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT)
        glview = GLViewImpl::create("TinkerPuzzle");
#else
        glview = GLViewImpl::createWithRect("TinkerPuzzle", cocos2d::Rect(0,0,900,640));
#endif
        director->setOpenGLView(glview);
    }
    
    // set FPS. the default value is 1.0/60 if you don't call this
    director->setAnimationInterval(1.0 / 60);

    ScriptingCore* sc = ScriptingCore::getInstance();
    ScriptEngineManager::getInstance()->setScriptEngine(sc);

    se::ScriptEngine* se = se::ScriptEngine::getInstance();

    jsb_set_xxtea_key("b7af4810-127a-40");
    jsb_init_file_operation_delegate();

#if defined(COCOS2D_DEBUG) && (COCOS2D_DEBUG > 0)
    // Enable debugger here
    jsb_enable_debugger("0.0.0.0", 5086);
#endif

    se->setExceptionCallback([](const char* location, const char* message, const char* stack){
        // Send exception information to server like Tencent Bugly.
		se::Object* globalObj = se::ScriptEngine::getInstance()->getGlobalObject();
		se::Value errorHandler;
		if (globalObj->getProperty("__errorHandler", &errorHandler) && errorHandler.isObject() && errorHandler.toObject()->isFunction())
		{
			se::ValueArray args;
			args.push_back(se::Value("custom error report"));
			args.push_back(se::Value(std::string(location)));
			args.push_back(se::Value(std::string(message)));
			args.push_back(se::Value(std::string(stack)));
			errorHandler.toObject()->call(args, globalObj);
		}

    });

    jsb_register_all_modules();
#ifdef SDKBOX_ENABLED
    se->addRegisterCallback(register_all_PluginAdMobJS);
    se->addRegisterCallback(register_all_PluginAdMobJS_helper);
#endif
#ifdef SDKBOX_ENABLED
    se->addRegisterCallback(register_all_PluginSdkboxAdsJS);
    se->addRegisterCallback(register_all_PluginSdkboxAdsJS_helper);
	se->addRegisterCallback(register_all_GameAnalyticsJS);
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID || CC_TARGET_PLATFORM == CC_PLATFORM_IOS) && PACKAGE_AS
    se->addRegisterCallback(register_all_anysdk_framework);
    se->addRegisterCallback(register_all_anysdk_manual);
#endif

	
    se->start();

    jsb_run_script("main.js");

    return true;
}

// This function will be called when the app is inactive. When comes a phone call,it's be invoked too
void AppDelegate::applicationDidEnterBackground()
{
    auto director = Director::getInstance();
    director->stopAnimation();
    director->getEventDispatcher()->dispatchCustomEvent("game_on_hide");
}

// this function will be called when the app is active again
void AppDelegate::applicationWillEnterForeground()
{
    auto director = Director::getInstance();
    director->startAnimation();
    director->getEventDispatcher()->dispatchCustomEvent("game_on_show");
}
