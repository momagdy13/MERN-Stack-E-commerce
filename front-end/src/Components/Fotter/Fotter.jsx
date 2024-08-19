import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { Box, Typography, useTheme } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";

export default function Fotter() {
  let date = new Date();
  let year = date.getFullYear();

  const footerLi = [
    {
      title: "Fation",
      content: ["Men", "Women", "Children", "Packaged Produce", "Party Trays"],
    },
    {
      title: "Gerocery",
      content: [
        "Fresh Vegetables",
        "Herbs & Seasonings",
        "Fresh Fruits",
        "Cuts & Sprouts",
        "Exotic Fruits & Veggies",
        "Packaged Produce",
        "Party Trays",
      ],
    },
    {
      title: "Electronic",
      content: [
        "Apple",
        "Samsung",
        "New Arrive",
        "Good Price",
        "Many Models",
        "Packaged Produce",
        "Party Trays",
      ],
    },
    {
      title: "Shoes",
      content: [
        "All Brands",
        "Nike",
        "Addids",
        "Good Price",
        "Many Models",
        "Packaged Produce",
        "Party Trays",
      ],
    },
    {
      title: "Watch",
      content: [
        "Apple",
        "Samsung",
        "New Arrive",
        "Good Price",
        "Many Models",
        "Packaged Produce",
        "Party Trays",
      ],
    },
  ];

  return (
    <>
      {/* Fotter Icon  */}
      <div className="fotter">
        <div className="icon-fotter">
          <div className="icon">
            <Icons
              icon={<ElectricBoltIcon />}
              title={"Fast Delivery"}
              subTitle={"Start from $10"}
            />
          </div>
          <div className="icon">
            <Icons
              icon={<CreditScoreOutlinedIcon />}
              title={"Money Guarantee"}
              subTitle={"7 Days Back"}
            />
          </div>

          <div className="icon">
            <Icons
              icon={<WorkspacePremiumOutlinedIcon />}
              title={"365 Days"}
              subTitle={"For free return"}
            />
          </div>

          <div>
            <Icons
              icon={<AccessAlarmOutlinedIcon />}
              title={"Payment"}
              subTitle={"Secure system"}
            />
          </div>
        </div>
        {/* Fotter Icon  */}

        {/* Fotter Content  */}
        <div>
          <ul className="fotter-content">
            {footerLi.map((item, index) => (
              <li key={index}>
                <h5>{item.title}</h5>
                <ul id="fotter-content">
                  {item.content.map((contentItem, contentIndex) => (
                    <li key={contentIndex}>
                      <h6>{contentItem}</h6>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        {/* Fotter Content  */}

        {/* Fotter  */}
        <div className="footer">
          <h6>Design&Developed by Mohamed Magdy. Copyright © {year} MO</h6>
          <ul className="social-icons">
            <li className="social-icons">
              <a
                href="https://github.com/momagdy13"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>

            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/mohamed-magdy-863339304/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>

            <li className="social-icons">
              <a
                href="https://www.instagram.com/mmagdy89/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </div>
        {/* Fotter  */}
      </div>
    </>
  );
}

const Icons = ({ icon, title, subTitle }) => {
  const theme = useTheme();
  return (
    <div className="fotterIcon">
      {icon}
      <div>
        <h5>{title}</h5>
        <h5>{subTitle}</h5>
      </div>
    </div>
  );
};
