import React from "react";
import { Image } from "react-native";
import { 
  Container, 
  InputArea,
  CustomButton,
  CustomButtonText,
  SignUpMessageButton,
  SignUpMessageButtonText,
  SignUpMessageButtonTextBold
} from "./styles";

import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'

import SignInput from "../../components/SignInput";

export default () => {
  return (
    <Container>
      <Image
        source={require("../../assets/logo.png")}
      />
      <InputArea>
        <SignInput IconSvg={EmailIcon}/>
        <SignInput IconSvg={LockIcon}/>
        <CustomButton >
          <CustomButtonText>
            LOGIN
          </CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignUpMessageButton>
        <SignUpMessageButtonText>
          Ainda não possui uma conta?
        </SignUpMessageButtonText>
        <SignUpMessageButtonTextBold>
          Registe-se
        </SignUpMessageButtonTextBold>
      </SignUpMessageButton>
    </Container>
  )
}