import React from "react";
import { Modal, Group, Button, Box } from "@mantine/core";
import styled from "@emotion/styled";
import { SkillList } from "../../general/interfaces/Skill";

import DiceBox from "@3d-dice/dice-box";
// const diceBoxLib = require("@3d-dice/dice-box");
// console.log(diceBoxLib);
// const { DiceBox } = diceBoxLib;

// https://github.com/3d-dice/dice-box

type DiceStatus = "initial" | "rolling" | "done";
interface DiceState {
  status: DiceStatus;
  number: number;
}

const DiceRoller: React.FC = () => {
  const [opened, setOpened] = React.useState(false);
  const [canCloseDialog, setCanCloseDialog] = React.useState(false);
  const [diceBox, setDiceBox] = React.useState<any>(null);
  const [diceState, setDiceState] = React.useState<DiceState>({
    status: "initial",
    number: 20,
  });
  const { status, number } = diceState;
  const diceBoxRef = React.useRef(null);
  const titleText = "Stranger: take a closer look at the powered-up console.";
  const skill = SkillList[0];
  const difficultyClass: number = 10;
  const difficultyUppercase: string = "difficulty".toUpperCase();
  const classUppercase: string = "class".toUpperCase();
  const sides: number = 20;

  React.useEffect(() => {
    console.log("hej", diceBoxRef.current);
    if (diceBoxRef.current) {
      const box = new DiceBox("#dice-box", {
        assetPath: "/assets/",
        id: "dice-canvas",
        scale: 14,
      });
      console.log("Setting dicebox");
      setDiceBox(box);
    }
  }, [diceBoxRef]);

  const rollDice = () => {
    console.log("Using dicebox");
    console.log(diceBox);
    // const box = new DiceBox("#dice-box", {
    //   assetPath: "/assets/",
    //   id: "dice-canvas",
    //   scale: 14,
    // });
    // box.init().then(() => {
    //   box.roll("1d20");
    // });
    diceBox &&
      diceBox.init().then(() => {
        diceBox.roll("1d20");
      });

    setDiceState({ ...diceState, status: "rolling" });
    setTimeout(() => {
      const diceNumber = Math.floor(Math.random() * sides) + 1;
      setDiceState({ status: "done", number: diceNumber });
      setCanCloseDialog(true);
    }, 500);
  };

  React.useEffect(() => {
    if (opened) {
      setCanCloseDialog(false);
      setDiceState({ status: "initial", number: 20 });
    }
  }, [opened]);

  const renderDiceInformation = () => {
    if (number === 20) {
      return (
        <>
          <div>{number}</div>
          <div>{`Critical Success`.toUpperCase()}</div>
        </>
      );
    }
    if (number === 1) {
      return (
        <>
          <div>{number}</div>
          <div>{`Critical Failure`.toUpperCase()}</div>
        </>
      );
    }
    if (number >= difficultyClass) {
      return (
        <>
          <div>{number}</div>
          <div>{`Success`.toUpperCase()}</div>
        </>
      );
    }
    return (
      <>
        <div>{number}</div>
        <div>{`Failure`.toUpperCase()}</div>
      </>
    );
  };

  return (
    <Wrapper>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnEscape={canCloseDialog}
        closeOnClickOutside={canCloseDialog}
        centered
        withCloseButton={false}
        title={titleText}
      >
        <ContentContainer>
          <Box sx={{ display: "flex" }}>{skill.name}</Box>
          <Box sx={{ display: "flex" }}>{skill.ability} check</Box>
        </ContentContainer>
        <ContentContainer>
          <div>{difficultyUppercase}</div>
          <div>{classUppercase}</div>
          <div>{difficultyClass}</div>
        </ContentContainer>
        <ContentContainer>
          <Box
            ref={diceBoxRef}
            id="dice-box"
            sx={{ height: "200px", width: "200px", backgroundColor: "grey" }}
          ></Box>
          {status === "done" && renderDiceInformation()}
          <Button onClick={rollDice} disabled={status !== "initial"}>
            Roll
          </Button>
        </ContentContainer>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Some event</Button>
      </Group>
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentContainer = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default DiceRoller;
