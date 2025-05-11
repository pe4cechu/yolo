import "./globals.css";
import PropTypes from "prop-types";
import favicon from "@/app/public/icons/favicon.svg";

export const metadata = {
  title: "Greenly",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon.src} />
        <title>Greenly</title>
      </head>
      <body className={"text-black "}>
          {children}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
