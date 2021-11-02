import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import ThemeDefault from '@dod-advana/advana-platform-ui/dist/theme-default';
import Dialog from '@material-ui/core/Dialog';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import EmailValidator from 'email-validator';
import LoadingIndicator from '@dod-advana/advana-platform-ui/dist/loading/LoadingIndicator';
import Auth from '@dod-advana/advana-platform-ui/dist/utilities/Auth';
import StarRating from './StarRating';
import { submitFeedback } from '../api/api';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import '../css/FeedbackModal.css';
import grey from '@material-ui/core/colors/grey';

require('typeface-noto-sans');
require('typeface-montserrat');

const styles = {
	required: {
		color: 'darkred',
		fontWeight: 'bold',
		fontSize: 14,
		marginTop: 0
	},
	input: {
		width: '100%',
		border: '1px solid lightgrey',
		padding: 8
	},
	textArea: {
		width: '100%',
		height: 150,
		border: '1px solid lightgrey'
	},
	experienceLabel: {
		fontWeight: 'bold',
		textTransform: 'uppercase'
	},


	dialog: {
		width: '100%',
		maxWidth: 800,
		// ...props.dialogStyle,
	},
	mainContainer: {
		paddingLeft: 20,
		paddingRight: 20
	},
	title: {
		fontFamily: 'Roboto',
		fontSize: 24,
		color: '#3c4144',
		paddingBottom: 20
	},
	label: {
		height: 15,
		fontSize: 14,
		color: '#555555',
	},
	contentRow: {
		marginBottom: 20,
		maxHeight: 400,
		overflowY: 'auto'
	},
	secondaryButton: {
		marginRight: 10,
		display: 'inline'
	}

}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const classStyles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});


const DialogTitle = withStyles(classStyles)((props) => {
	const { children, classes, onClose, handleSubmit, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h3">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

export default function FeedbackModal({
	open,
	setOpen,
	handleSubmit
}) {
	const displayName = Auth.getUserDisplayName();
	const nameSplits = displayName.split(' ');
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [hoveredRating, setHoveredRating] = useState(null);
	const classes = useStyles();

	const onRequestClose = () => {
		setOpen(false);
		setEmailError(false);
	}

	const defaultState = {
		firstName: nameSplits[0] || '',
		lastName: nameSplits[1] || '',
		email: Auth.getUserEmail() || '',
		feedback: '',
		rating: null
	}

	const [rating, setRating] = useState(defaultState.rating);
	const [firstName, setFirstName] = useState(defaultState.firstName);
	const [lastName, setLastName] = useState(defaultState.lastName);
	const [email, setEmail] = useState(defaultState.email);
	const [feedback, setFeedback] = useState(defaultState.feedback);
	const [emailError, setEmailError] = useState(false);
	const [emailTextFocus, setEmailTextFocus] = useState(false);

	const handleEmailChange = (email) => {
		if (EmailValidator.validate(email)) {
			setEmailError(false);
		} else {
			setEmailError(true);
		}
		setEmail(email);
	};

	const resetFeedbackForm = () => {
		setFirstName(defaultState.firstName);
		setLastName(defaultState.lastName);
		setEmail(defaultState.email);
		setEmailError(false)
		setFeedback(defaultState.feedback);
		setRating(defaultState.rating);
	}

	const handleSubmitFeedback = async () => {
		try {
			setLoading(true);
			if(handleSubmit){
				await handleSubmit({
					name: `${firstName} ${lastName}`,
					email,
					feedback,
					rating
				});
			}else{
				await submitFeedback({
					name: `${firstName} ${lastName}`,
					email,
					feedback,
					rating
				});
			}

			setAlert({
				title: 'Success!',
				severity: 'success',
				message: 'Thank you for submitting your feedback!'
			});

			resetFeedbackForm();
		} catch (e) {
			setAlert({
				title: 'Error!',
				severity: 'error',
				message: 'An error has occurred while submitting your feedback. Please try again later.'
			});
			console.error(e);
		} finally {
			setLoading(false);
			setOpen(false);
		}


	}

	const disableSubmit = firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || emailError;

	return <MuiThemeProvider theme={ThemeDefault}>
		<div className={classes.root}>
			{alert && <Alert severity={alert.severity} onClose={()=>setAlert(null)}>
				<AlertTitle>{alert.title}</AlertTitle>
				{alert.message}
			</Alert>}

			<Dialog
				id='jira-feedback'
				modal={false}
				open={open}
				onRequestClose={onRequestClose}
				contentStyle={styles.dialog}
				autoScrollBodyContent={true}
				PaperProps={{style: {padding: 20, minWidth: 700}}}
			>

				<DialogTitle onClose={onRequestClose}>Help us improve your experience with feedback!</DialogTitle>
				<DialogContent>
					<div style={{
						paddingLeft: 20,
						paddingRight: 20
					}}>
						{loading ? <LoadingIndicator /> : <>
							<div className="row m-b-15" style={{width: '95%'}}>
								<div className="col-6">
									<TextField
										variant='outlined'
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										name="labels"
										label='First Name'
										style={{ fontSize: 'small', minWidth: '200px', width: '100%' }}
									/>
									<p style={styles.required}>*Required</p>
								</div>
								<div className="col-6">
									<TextField
										variant='outlined'
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										name="labels"
										label='Last Name'
										style={{ fontSize: 'small', minWidth: '200px', width: '100%' }}
									/>
									<p style={styles.required}>*Required</p>
								</div>
							</div>

							<div className="row m-b-15" style={{width: '95%'}}>
								<div className="col-12">
									<TextField
										onFocus={() => setEmailTextFocus(true)}
										onBlur={() => setEmailTextFocus(false)}
										variant='outlined'
										value={email}
										onChange={(e) => handleEmailChange(e.target.value)}
										name="labels"
										label='Email'
										style={{ fontSize: 'small', minWidth: '200px', width: '100%' }}
										error={emailError}
										helperText={
											emailError && !emailTextFocus
												? 'Please enter a valid email address.'
												: ''
										}
									/>
									<p style={styles.required}>*Required</p>
								</div>
							</div>
							<div className="row m-b-15">
								<div className="col-12">
									<div style={styles.experienceLabel}>Your overall experience?</div>
									<StarRating rating={rating} setRating={setRating} hoveredRating={hoveredRating} setHoveredRating={setHoveredRating} />
								</div>
							</div>
							<div className="row">
								<div className="col-12">
								<TextField
									variant="outlined"
									placeholder="Provide Feedback Here..."
									multiline
									rows={5}
									value={feedback}
									onChange={(e) => setFeedback(e.target.value)}
									style={{ fontSize: 'small', minWidth: '200px', width: '100%' }}

								/>
								</div>
							</div>
						</>}
					</div>
				</DialogContent>
				<DialogActions style={{marginTop: 20}}>
					<Button onClick={onRequestClose} style={{ 
						backgroundColor: '#E0E0E0',
						textTransform: 'none',
						padding: '6px 15px',
						fontSize: 16
					}} >
						Cancel
					</Button>
					<Button autoFocus onClick={handleSubmitFeedback} disabled={disableSubmit} 
						style={{ 
							backgroundColor: disableSubmit ? grey[400]: '#E9691D',
							color: 'white',
							textTransform: 'none',
							fontSize: 16,
							padding: '6px 15px',
						}}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	</MuiThemeProvider>
}
