import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const AllFacts = ({ facts }) => (
  <div className="random_fact">
    {facts &&
      facts.map((fact) => (
        <Card
          style={{
            backgroundColor: "rgb(18, 18, 18)",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: 10,
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
            <Typography variant="body1">{fact.text}</Typography>{" "}
          </CardContent>
        </Card>
      ))}
  </div>
);

export default AllFacts;
