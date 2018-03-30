package org.cocos2dx.javascript;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Handler;


/**
 * Created by xiaox on 2016/9/9.
 */
public class CPController {
    private static Context mContext;
    public static void init(Context me)
    {
        mContext=me;

        com.jcyggame.crosspromotion.LogEx.setDebug(false);
        com.jcyggame.crosspromotion.ZYCrossPromotion.setCurrentContext(me);
        com.jcyggame.crosspromotion.ZYCrossPromotion.init();
        com.jcyggame.crosspromotion.ZYCrossPromotion.requestNewPopWindow();
        com.jcyggame.crosspromotion.ZYCrossPromotion.requestExitCP();

    }

    private static boolean winIsPop=false;
    public static void showPopWindow()
    {
        if (!winIsPop){
            ((Activity)mContext).runOnUiThread(new Runnable() {
                public void run(){
                    if (com.jcyggame.crosspromotion.ZYCrossPromotion.isPopWindowDataLoaded()){
                        winIsPop=true;
                        com.jcyggame.crosspromotion.ZYCrossPromotion.showPopWindow();
                    }
                }
            });
        }
    }
    private static boolean isFullPoped=false;
    public static void showFullWindow()
    {
        if (!isFullPoped){
            ((Activity)mContext).runOnUiThread(new Runnable() {
                public void run(){
                    if (com.jcyggame.crosspromotion.ZYCrossPromotion.isPopWindowDataLoaded()){
                        isFullPoped=true;
                        com.jcyggame.crosspromotion.ZYCrossPromotion.showFullCp();
                    }
                }
            });
        }
    }
    private static Handler mHander=new Handler();
    public static void exitAlert()
    {
        mHander.post(new Runnable(){
            @Override
            public void run() {
                if (com.jcyggame.crosspromotion.ZYCrossPromotion.onBackPressed())
                {
                    return ;
                }
                com.jcyggame.crosspromotion.ZYCrossPromotion.showExitCP();
            }
        });
    }


    public static void rateApp()
    {
        try
        {
            String url = "market://details?id=" + mContext.getPackageName();
            Intent intent = new Intent("android.intent.action.VIEW", Uri.parse(url));
            mContext.startActivity(intent);
        }catch(ActivityNotFoundException ex)
        {
            System.out.println("Not this APP");
        }
    }

}
