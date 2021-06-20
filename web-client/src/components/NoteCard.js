import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

export default function NoteCard({ card, handleDelete }) {
  return (
    <div className="singleCard" >
      <Card elevation={5}>
        <CardHeader
          action={
            <IconButton onClick={() => handleDelete(card.person_id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={card.name}
          //   subheader={card.email_id}
          subheader={"Payment Left: " + card.balance}
        />
        <CardContent>
          <Typography variant="body" color="textSecondary">
            {card.email_id}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
