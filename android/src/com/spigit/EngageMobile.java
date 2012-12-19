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
        super.loadUrl("file:///android_asset/www/index.html");
    }
}


//package com.example;
//
//import android.os.Bundle;
//import org.apache.cordova.*;
//
//public class EngageMobile extends DroidGap {
//    /**
//     * Called when the activity is first created.
//     */
//    @Override
//    public void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
////        super.loadUrl("file:///android_asset/www/index.html");
//    }
//}