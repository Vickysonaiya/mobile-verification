import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import image from "./images";
import "./index.css";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (showOTP && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [showOTP, timer]);


  function onSignup() {
    if (ph.length < 10) return;
    setLoading(true);
    setShowOTP(true);
    setTimer(60);
    toast.success("OTP sent successfully!");

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    if (otp === "123456") {
      navigate("/dashboard");
    } else {
      setLoading(false);
      toast.error("Wrong OTP");
      setOtp("");
    }
  }

  return (
    <section className="bg-white flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        <div style={{width: '21rem'}} className="flex flex-col gap-1 rounded-lg p-4">
          {showOTP ? (
            <>
              <div className="bg-white">
                <img src={image.logo} className="mx-auto w-30 h-20" />
              </div>
              <label className="font-bold text-xl text-center">
                Enter OTP
              </label>
              <label className="font-bold text-gray-900 text-center">
                Enter the otp that was sent to your mobile number +{ph}
              </label>
              <img
                src={image.image2}
                alt="Sign in illustration"
                className="mx-auto w-80 h-60"
              />
              <label className="text-gray-500 text-center">
                By sumbitting the OTP, you agree with our <a className="terms" href="#">Terms and Conditions</a> and <a className="terms" href="#">Privacy Policy</a>
              </label>
              <OtpInput
                className="otp-container"
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                autoFocus
              />
              <p className="text-center text-gray-600">
                {timer > 0 ? (
                  <><span className="text-black font-bold">{timer}</span> sec left</>
                ) : (
                  <span
                    className="text-black font-bold cursor-pointer"
                    onClick={onSignup}
                  >
                    Resend OTP
                  </span>
                )}
              </p>
              <button
                onClick={onOTPVerify}
                disabled={otp.length < 6}
                className={`flex gap-1 items-center justify-center py-2.5 rounded button ${otp.length < 6 ? "bg-gray-500 text-white cursor-not-allowed" : "bg-black text-white"}`}
              >
                {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                <span>Verify OTP</span>
              </button>
            </>
          ) : (
            <>
              <img src={image.logo} className="mx-auto w-30 h-20" />
              <label className="font-bold text-xl text-black text-center">
                Sign in with Mobile number
              </label>
              <label className="text-gray-800 text-center">
                1/Pass ensures only authenticated and verified hosts are able to invite visitors.
              </label>
              <img src={image.image1} className="mx-auto w-120 h-50" />
              <p className="text-gray-400">Mobile Number</p>
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
              <button
                onClick={onSignup}
                disabled={ph.length < 10} // ✅ Disabled until 10 digits are entered
                className={`w-full flex gap-1 items-center justify-center py-2.5 rounded ${ph.length < 10 ? "bg-gray-500 text-white cursor-not-allowed" : "bg-black text-white"}`}
              >
                {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                <span>Send OTP</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
