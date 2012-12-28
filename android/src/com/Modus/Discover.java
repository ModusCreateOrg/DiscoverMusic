package com.Modus;


import android.os.Bundle;
import org.apache.cordova.*;


public class Discover extends DroidGap {
    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.setIntegerProperty("splashscreen", R.drawable.splash);

        super.onCreate(savedInstanceState);
        super.clearCache();
//        super.loadUrl("http://mqtest.io", 3000);
        super.loadUrl("file:///android_asset/www/index.html", 4000);
//        super.loadUrl("http://192.168.1.138/html5/m.html", 3000);
//        super.loadUrl("http://192.168.1.138/html5/", 5000);
//        super.loadUrl("http://192.168.1.138/html5/mqtester.html", 3000);

    }
}

