import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const navigate = useNavigate();
  
    function onCaptchVerify() {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible", callback: () => onSignup() },
          auth
        );
      }
    }
  
    function onSignup() {
      setLoading(true);
      onCaptchVerify();
      setShowOTP(true);
      toast.success("OTP sent successfully!");
      const appVerifier = window.recaptchaVerifier;
      const formatPh = "+" + ph;
  
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP sent successfully!");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  
    function onOTPVerify() {
      setLoading(true);
      if(otp == 123456){
        navigate("/dashboard");
      }
      // window.confirmationResult
      //   .confirm(otp)
      //   .then(() => {
      //     setLoading(false);
      //     navigate("/dashboard");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setLoading(false);
      //   });
    }
  
    return (
      <section className="bg-slate-800 flex items-center justify-center h-screen">
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            {showOTP ? (
              <>
                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label className="font-bold text-xl text-white text-center">
                  Enter your OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  autoFocus
                />
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <label className="font-bold text-xl text-white text-center">
                  Sign in with your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                  <span>Send code via SMS</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    );
};

 export default Login;