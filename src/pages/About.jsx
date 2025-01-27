import GoalsAndAspirations from "../components/About/GoalsAndAspirations ";
import TeamSection from "../components/About/TeamSection";
// import Footer from "../components/Footer";
import Accordion from "../components/Home/Accordian";
import CaregiverSection from "../components/Home/CaregiverSection";
import Collaborate from "../components/Home/Collaborate";
import Testmonial from "../components/Home/testmonial/Testmonial";

function About() {
  return (
    <div>
      <TeamSection />
      <Collaborate />
      <GoalsAndAspirations />
      <Testmonial />
      <CaregiverSection classData="bg-gradient-to-b from-white to-green-900" />
      <Accordion />
      {/* <Footer classData="bg-footer" /> */}
    </div>
  );
}

export default About;
