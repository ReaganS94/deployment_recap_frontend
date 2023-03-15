import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Homepage = ({ randomFact, error, randomizer }) => (
  <div className="random_fact">
    <Button variant="contained" onClick={randomizer}>
      Get random fact
    </Button>
    <div className="random_fact_text">
      {randomFact ? (
        <Card
          style={{
            backgroundColor: "rgb(18, 18, 18)",
            color: "rgba(255, 255, 255, 0.7)",
          }}
          variant="outlined"
          sx={{
            minWidth: 275,
            maxWidth: 500,
            minHeight: 100,
          }}
        >
          <CardContent>
            {" "}
            <Typography variant="body1">{randomFact.text}</Typography>{" "}
          </CardContent>
        </Card>
      ) : (
        "Loading..."
      )}
    </div>
  </div>
);

export default Homepage;
