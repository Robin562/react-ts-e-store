const Footer = () => {
  const year: number = new Date().getFullYear();
  return <footer className="footer">Copyright &copy; {year} Krishna</footer>;
};

export default Footer;
