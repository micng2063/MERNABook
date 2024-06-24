import React from "react";

const states = [
	"Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
	"Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
	"Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
	"Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
	"Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
	"Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

export function CheckoutForm({ formData, onChange }) {
	return (
		<div className="row">
			<div className="col-md-6 form-group">
				<label>First Name</label>
				<input className="form-control" name="firstName" type="text" placeholder="John"
					onChange={onChange} value={formData.firstName} />
			</div>
			<div className="col-md-6 form-group">
				<label>Last Name</label>
				<input className="form-control" name="lastName" type="text" placeholder="Doe"
					onChange={onChange} value={formData.lastName} />
			</div>
			<div className="col-md-6 form-group">
				<label>E-mail</label>
				<input className="form-control" name="email" type="text" placeholder="example@email.com"
					onChange={onChange} value={formData.email} />
			</div>
			<div className="col-md-6 form-group">
				<label>Mobile No</label>
				<input className="form-control" name="phone" type="number" placeholder="+123 456 789"
					onChange={onChange} value={formData.phone} />
			</div>
			<div className="col-md-6 form-group">
				<label>Address Line 1</label>
				<input className="form-control" name="addressLine1" type="text" placeholder="123 Street"
					onChange={onChange} value={formData.addressLine1} />
			</div>
			<div className="col-md-6 form-group">
				<label>Address Line 2</label>
				<input className="form-control" name="addressLine2" type="text" placeholder="123 Street"
					onChange={onChange} value={formData.addressLine2} />
			</div>
			<div className="col-md-6 form-group">
				<label>Country</label>
				<select className="form-control">
					<option selected>United States</option>
				</select>
			</div>
			<div className="col-md-6 form-group">
				<label>City</label>
				<input className="form-control" name="city" type="text" placeholder="New York"
					onChange={onChange} value={formData.city} />
			</div>
			<div className="col-md-6 form-group">
				<label>State</label>
				<select className="form-control" name="state" onChange={onChange} value={formData.state}>
					<option value="" className="border-white">Select State</option>
					{states.map(state => (
						<option key={state} value={state}>{state}</option>
					))}
				</select>
			</div>
			<div className="col-md-6 form-group">
				<label>ZIP Code</label>
				<input className="form-control" name="zipCode" type="text" placeholder="123"
					onChange={onChange} value={formData.zipCode} />
			</div>
		</div>
	);
};

export default CheckoutForm;
