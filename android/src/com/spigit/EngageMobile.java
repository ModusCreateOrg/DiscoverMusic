package com.spigit;

import android.os.Bundle;
import org.apache.cordova.*;


public class EngageMobile extends DroidGap {
    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        super.loadUrl("http://extraordinarycommons.com/MediaQueryTest.html");
//        super.loadUrl("http://mqtest.io");
        super.loadUrl("http://10.1.10.11/html5/");
//        super.loadUrl("http://10.1.10.11/html5/m.html");
    }
}

