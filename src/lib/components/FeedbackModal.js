import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ThemeDefault from 'advana-platform-ui/dist/theme-default';
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
import LoadingIndicator from 'advana-platform-ui/dist/loading/LoadingIndicator';
import Auth from 'advana-platform-ui/dist/utilities/Auth';
import StarRating from './StarRating';
import { submitFeedback } from '../api/api';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import '../css/FeedbackModal.css';

require('typeface-noto-sans');
require('typeface-montserrat');


const styles = {
	required: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 14
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
		fontWeight: 'bold'
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
	const { children, classes, onClose, ...other } = props;
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
	setOpen
}) {
	const displayName = Auth.getUserDisplayName();
	const nameSplits = displayName.split(' ');
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);
	const [hoveredRating, setHoveredRating] = useState(null);
	const classes = useStyles();

	const onRequestClose = () => setOpen(false);

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

	const resetFeedbackForm = () => {
		setFirstName(defaultState.firstName);
		setLastName(defaultState.lastName);
		setEmail(defaultState.email);
		setFeedback(defaultState.feedback);
		setRating(defaultState.rating);
	}

	const handleSubmitFeedback = async () => {
		try {
			setLoading(true);
			await submitFeedback({
				name: `${firstName} ${lastName}`,
				email,
				feedback,
				rating
			});

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

	const disableSubmit = firstName.trim() === '' || lastName.trim() === '' || email.trim() === '';

	return <MuiThemeProvider theme={ThemeDefault}>
		<div className={classes.root}>
			{alert && <Alert severity={alert.severity} onClose={()=>setAlert(null)}>
				<AlertTitle>{alert.title}</AlertTitle>
				{alert.message}
			</Alert>}

			<Dialog
				modal={false}
				open={open}
				onRequestClose={onRequestClose}
				contentStyle={styles.dialog}
				autoScrollBodyContent={true}
			>

				<DialogTitle onClose={onRequestClose}>Help us improve your experience with feedback!</DialogTitle>
				<DialogContent dividers>
					<div style={{
						paddingLeft: 20,
						paddingRight: 20
					}}>
						{loading ? <LoadingIndicator /> : <>
							<div className="row m-b-15">
								<div className="col-6">
									<input style={styles.input} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
									<p style={styles.required}>*Required</p>
								</div>
								<div className="col-6">
									<input style={styles.input} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
									<p style={styles.required}>*Required</p>
								</div>
							</div>

							<div className="row m-b-15">
								<div className="col-12">
									<input placeholder="Email Address" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
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
									<textarea style={styles.textArea} placeholder="Provide Feedback Here" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
								</div>
							</div>
						</>}
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={onRequestClose} color={"secondary"} >
						Cancel
					</Button>
					<Button autoFocus onClick={handleSubmitFeedback} disabled={disableSubmit} color={"primary"}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	</MuiThemeProvider>
}