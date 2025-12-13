import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);
const Payment = () => {
  return (
    <div>
      <SectionTitle
        heading={"Payment Now ! "}
        subHeading={"Please Payment!!"}
      />

      <>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </>
    </div>
  );
};

export default Payment;
