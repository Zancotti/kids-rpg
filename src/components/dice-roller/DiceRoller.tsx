import React from "react";
import { Modal, Group, Button, Box } from "@mantine/core";
import styled from "@emotion/styled";
import { SkillList } from "../../general/interfaces/Skill";

// https://github.com/3d-dice/dice-box

type DiceStatus = "initial" | "rolling" | "done";
interface DiceState {
  status: DiceStatus;
  number: number;
}

const DiceRoller: React.FC = () => {
  const [opened, setOpened] = React.useState(false);
  const [canCloseDialog, setCanCloseDialog] = React.useState(false);
  const [diceState, setDiceState] = React.useState<DiceState>({
    status: "initial",
    number: 20,
  });
  const { status, number } = diceState;

  const titleText = "Stranger: take a closer look at the powered-up console.";
  const skill = SkillList[0];
  const difficultyClass: number = 10;
  const difficultyUppercase: string = "difficulty".toUpperCase();
  const classUppercase: string = "class".toUpperCase();
  const sides: number = 20;

  const rollDice = () => {
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
