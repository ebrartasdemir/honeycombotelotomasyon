function HomeContent() {
  const colorStyle = `rgba(${255}, ${255}, ${255}, ${0.9})`;
  return (
    <div>
      <p style={{ color: colorStyle, padding: "0px 250px 0px 250px", textAlign:"center"}}>
        Honeycomb is an advanced hotel management automation system<br/> designed to
        streamline all aspects of your hotel's operations. Room reservations to
        reporting Honeycomb integrates all essential functions into a single,
        user-friendly platform. With real-time data analytics and seamless
        integration with existing systems, Honeycomb enhances efficiency,
        reduces operational costs, and improves tracking your serves. Its
        intuitive interface allows hotel staff to easily manage daily tasks,
        while the automated processes ensure accuracy and consistency in all
        operations.
      </p>
      <h1 style={{ fontSize: "3rem", color: colorStyle }}>Honeycomb</h1>
      <h2 style={{ color: colorStyle, padding: "0px 250px 75px 250px" ,textAlign:"center"}}>
        "Honeycomb: Where Efficiency Meets Excellence in Hospitality."
      </h2>
    </div>
  );
}
export default HomeContent;
