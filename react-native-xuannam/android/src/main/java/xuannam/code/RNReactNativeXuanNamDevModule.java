package xuannam.code;
//Kế thừa
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class RNReactNativeXuanNamDevModule  extends ReactContextBaseJavaModule {
    public void tinhtong(a,b) {
        Log.d(a,b, "Test native A+B");
        return (a+b)
    }

}
