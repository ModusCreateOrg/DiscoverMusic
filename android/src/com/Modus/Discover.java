package com.Modus;


import android.os.Bundle;
import org.apache.cordova.*;


public class Discover extends DroidGap {
    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
    super.setIntegerProperty("splashscreen", R.drawable.ic_launcher);

        super.onCreate(savedInstanceState);
//        super.loadUrl("http://extraordinarycommons.com/MediaQueryTest.html");
//        super.loadUrl("http://mqtest.io");
        super.loadUrl("file:///android_asset/www/index.html");
//        super.loadUrl("http://10.1.10.11/html5/m.html");
//        super.loadUrl("http://10.1.10.11/html5/");

    }
}
