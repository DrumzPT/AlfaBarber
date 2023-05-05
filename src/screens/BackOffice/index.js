import React, { useEffect, useContext, useState } from "react";
import { Image } from "react-native";
import { Container, LoadingIcon } from "./styles";
import { ListItem } from "@rneui/themed";

export default () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ListItem.Accordion
      content={
        <>
          <ListItem.Content>
            <ListItem.Title>TEST</ListItem.Title>
          </ListItem.Content>
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      <ListItem key={1} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>aaaaa</ListItem.Title>
          <ListItem.Subtitle>bbbbb</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </ListItem.Accordion>
  );
};
