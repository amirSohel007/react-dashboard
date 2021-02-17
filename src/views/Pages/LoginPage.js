import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router';
import { no_auth_axios } from '../../api';
import { connect } from 'react-redux';
import { login } from '../../store/actions/login'
// react-bootstrap components
import {
	Badge,
	Button,
	Card,
	Form,
	Navbar,
	Nav,
	Container,
	Col,
} from 'react-bootstrap';

function LoginPage(props) {
	let history = useHistory();
	const { addToast } = useToasts();
	const { register, handleSubmit, watch, errors } = useForm();
	const [cardClasses, setCardClasses] = React.useState('card-hidden');
	const { isLoggedIn } = props.loginState;

	useEffect( () => {
		console.log("isLoggedIn", isLoggedIn)

		if(isLoggedIn) {
			addToast('Logged in sucessfully', {
				appearance: 'success',
				autoDismiss: true,
			});
			history.push('/admin/home');
		}	
	}, [isLoggedIn])


	// Login Method handle
	// const onSubmit = async (data) => {
	// 	await no_auth_axios
	// 		.post('/auth/login', data)
	// 		.then((res) => {
	// 			if (res.data) {
	// 				// addToast('Logged in sucessfully', {
	// 				// 	appearance: 'success',
	// 				// 	autoDismiss: true,
	// 				// });
	// 				// history.push('/admin/home');
	// 				const { access_token } = res.data;
	// 				localStorage.setItem('token', access_token);
	// 			}
	// 			res.data;
	// 		})
	// 		.catch((err) => {
	// 			addToast(err?.message, {
	// 				appearance: 'error',
	// 				autoDismiss: true,
	// 			});
	// 		});
	// };

	React.useEffect(() => {
		setTimeout(function () {
			setCardClasses('');
		}, 1000);
	});
	return (
		<>
			<div
				className='full-page section-image'
				data-color='black'
				data-image={require('assets/img/bg4.jpg').default}
			>
				<div className='content d-flex align-items-center p-0'>
					<Container>
						<Col className='mx-auto' lg='4' md='8'>
							<Form
								action=''
								className='form'
								onSubmit={handleSubmit(props.login)}
							>
								<Card className={'card-login ' + cardClasses}>
									<Card.Header>
										<h3 className='header text-center'>Login</h3>
									</Card.Header>
									<Card.Body>
										<Card.Body>
											<Form.Group>
												<label>Email address</label>
												<Form.Control
													placeholder='Enter email'
													type='text'
													name='username'
													ref={register({ required: true })}
												></Form.Control>
											</Form.Group>
											<Form.Group>
												<label>Password</label>
												<Form.Control
													placeholder='Password'
													type='password'
													name='password'
													ref={register({ required: true })}
												></Form.Control>
											</Form.Group>
											<Form.Check className='pl-0'>
												<Form.Check.Label>
													<Form.Check.Input
														defaultChecked
														type='checkbox'
													></Form.Check.Input>
													<span className='form-check-sign'></span>
													Subscribe to newsletter
												</Form.Check.Label>
											</Form.Check>
										</Card.Body>
									</Card.Body>
									<Card.Footer className='ml-auto mr-auto'>
										<Button className='btn-wd' type='submit' variant='warning'>
											Login
										</Button>
									</Card.Footer>
								</Card>
							</Form>
						</Col>
					</Container>
				</div>
				<div
					className='full-page-background'
					style={{
						backgroundImage:
							'url(' + require('assets/img/bg4.jpg').default + ')',
					}}
				></div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		loginState: state.login
	};
};
  
  
const mapDispatchToProps = (dispatch) => {
	return {
		login: data => dispatch(login(data)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LoginPage);
