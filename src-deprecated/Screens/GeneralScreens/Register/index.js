// Node Modules
import React, { useState } from 'react';

// Local Modules
import { MainContainerView } from '../../../Components/MainContainer'
import InputDefault from '../../../Components/InputDefault'
import {
	RegisterContainer,
	PageTitle,
	RegistrationForm,
	SubmitButton,
	SubmitButtonText,
} from './styles'

const Register = () => {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [passwordOne, setPasswordOne] = useState('')
	const [passwordTwo, setPasswordTwo] = useState('')

	return (
		<MainContainerView>
			<RegisterContainer>
				<RegistrationForm>

					<PageTitle>Registre-se</PageTitle>

					<InputDefault
						title='Nome'
						icon='person'
						placeholder='Nome'
						onChange={t => setName(t)}
						value={name}
					/>
					<InputDefault
						title='Email'
						icon='alternate-email'
						placeholder='Email'
						onChange={t => setEmail(t)}
						value={email}
					/>
					<InputDefault
						title='Crie uma senha'
						icon='lock'
						placeholder='Senha'
						onChange={t => setPasswordOne(t)}
						value={passwordOne}
						secureTextEntry={true}
					/>
					<InputDefault
						title='Repita a Senha'
						icon='lock'
						placeholder='Senha'
						onChange={t => setPasswordTwo(t)}
						value={passwordTwo}
						secureTextEntry={true}
					/>

					<SubmitButton>
						<SubmitButtonText>Enviar</SubmitButtonText>
					</SubmitButton>
				</RegistrationForm>
			</RegisterContainer>
		</MainContainerView>
	)
}

export default Register;