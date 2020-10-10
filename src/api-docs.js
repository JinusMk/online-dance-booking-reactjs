

// PS: instructor: {} this could change to instructors: [] in the future in every response, or instructor object may come inside the class time object in the future 

// /api/schedule  or /api/time-slots?all=true ->  Schedule page

var response = {
	statusCode: 200,
	data: {
		"09-10-2020": [
			{
				letzdance_id: '', 
				slug: 'zumba',
				title: 'Zumba',
				duration: '1 hour',
				rating: '4.5',
				ratingCount: 89,
				cost_old: 199, 
				cost: 99,
				no_of_participants: 90,
				instructor: { id: "", name: '', experience, rating: '', rating_count: 89, no_of_classes: 51, img: '', category: 'Hiphop' },
				classes: [
					{ id: 'dance_id + slot_id', start_time: '11.00 AM', label: 'Disabled', slot: 'morning' },
					{ id: 'dance_id + slot_id', start_time: '04.00 PM', label: 'Fast filling', slot: 'evening' }
				]
			},
			{
				letzdance_id: ' ',
				slug: 'bollywood',
				title: 'Bollywood',
				duration: '1 hour',
				rating: '4.5',
				ratingCount: 89, 
				cost_old: 199, 
				cost: 99,
				no_of_participants: 90,
				instructor: { id: "", name: '', experience, rating: '', rating_count: 89, no_of_classes: 51, img: '', category: 'Bollywood' },
				classes: [
					{ id: 'dance_id + slot_id', start_time: '11.00 AM', label: 'Disabled', slot: 'morning' }, 
					{ id: 'dance_id + slot_id', start_time: '04.00 PM', label: 'Fast filling', slot: 'evening' }
				]
			},
			{
				letzdance_id: ' ',
				slug: "hiphop",
				title: 'Hiphop',
				duration: '1 hour',
				rating: '4.5',
				ratingCount: 89, 
				cost_old: 199, 
				cost: 99,
				no_of_participants: 90,
				instructor: { id: "", name: '', experience, rating: '', rating_count: 89, no_of_classes: 51, img: '', category: 'Hiphop' },
				classes: [
					{ id: 'dance_id + slot_id', start_time: '11.00 AM', label: 'Disabled', slot: 'morning' }, 
					{ id: 'dance_id + slot_id', start_time: '04.00 PM', label: 'Fast filling', slot: 'evening' }
				]
			}
		]
	},
	message: ''
}



//api/dances - home page 

var response = {
	statusCode: 200,
	data: [
		{
			letzdance_id: '',
			slug: 'zumba',
			title: 'Zumba',
			rating: '',
			duration: '1 hour',
			cost_old: '199',
			cost: '99',
			rating_count: '',
			no_of_participants: 90,
			instructor: { id: "", name: '', experience, rating: '', rating_count: 89, no_of_classes: 51, img: '', category: 'Zumba' },
			classes: [ //very-next-available-classes just to show in the card
				{ id: 'dance_id + slot_id', start_time: '11.00 AM', label: 'Disabled', slot: 'morning' }, 
				{ id: 'dance_id + slot_id', start_time: '04.00 PM', label: 'Fast filling', slot: 'evening' }
			]
		},
		{
			letzdance_id: ' ',
			slug: 'bollywood',
			title: 'Bollywood',
			duration: '1 hour',
			rating: '4.5',
			ratingCount: 89, 
			cost_old: 199, 
			cost: 99,
			no_of_participants: 90,
			instructor: { id: "", name: '', experience, rating: '', rating_count: 89, no_of_classes: 51, img: '', category: 'Bollywood' },
			classes: [//very-next-available-classes just to show in the card
				{ id: 'dance_id + slot_id', start_time: '11.00 AM', label: 'Disabled', slot: 'morning' }, 
				{ id: 'dance_id + slot_id', start_time: '04.00 PM', label: 'Fast filling', slot: 'evening' }
			]
		},
	],
	message: ''
}

//api/dances/zumba -> zumba detail page

var response = {
	statusCode: 200,
	data: {
		letzdance_id: '',
		slug: 'Zumba',
		title: 'Zumba',
		rating: '',
		duration: '1 hour',
		cost_old: '199',
		cost: '99',
		no_of_participants: 90,
		rating_count: '',
		reviews: [
			{ id: '', name: '', rating: '', text: '', img: '', class_date: '', category: 'zumba', video: '' }
		],
		instructor: { id: "", name: '', experience, rating: '', rating_count: 89, no_of_classes: 51, img: '', category: 'Zumba' }
	},
	message: ''
}

//api/time-slots?category=“zumba” -> zumba detail page time slots

var response = {
	statusCode: 200,
	data: {
		"09-10-2020": [
				{
					id: 'dance_id + slot_id', 
					start_time: '11.00 AM', 
					label: 'Disabled', 
					slot: 'morning'
				},
				{
					  id: 'dance_id + slot_id', 
					start_time: '04.00 PM', 
					label: 'Fast filling', 
					slot: 'evening'
				}
		],
	},
	message: ''
}

///api/dance-classes/:id - booking page dance class detail

var response = {
	statusCode: 200,
	data: {
		id: 'dance_id + slot_id', 
		start_time: '11.00 AM', 
		label: 'Disabled', 
		slot: 'morning',
		date: '',
		letzdance_id: '',
		slug: 'Zumba',
		title: 'Zumba',
		rating: '',
		duration: '1 hour',
		cost_old: '199',
		cost: '99',
		rating_count: '',
		no_of_participants: 90,
		instructor: { id: "", name: '', experience, rating: '', rating_count: 89, no_of_classes: 51, img: '', category: 'Zumba'}
	},
	message: ''
}


//api/reviews - in the home page

var response = {
	statusCode: 200,
	data: [
		{
			id: '',
			name: '',
			img: '', 
			rating: '', 
			video: '',
			text: '', 
			class_date: '',
			category: 'zumba'
		},
		{
			id: '',
			name: '',
			rating: '', 
			text: '', 
			video: '',
			img: '', 
			class_date: '',
			category: 'bollywood'
		},
	],
	message: ''
}

//api/instructors- in the home page

var response = {
	statusCode: 200,
	data: [
		{
			id: "",
			name: '', 
			experience, 
			rating: '', 
			rating_count: 89, 
			no_of_classes: 51, 
			category: 'Zumba',
			img: ''	
		},
		{
			id: "",
			name: '', 
			experience, 
			rating: '', 
			rating_count: 89, 
			no_of_classes: 51, 
			category: 'Bollywood',
			img: ''	
		},
	]
}

//api/dance-history - user can access after login and will see all the bookings here

var response = {
	statusCode: 200, 
	data: {
		"09-10-2020": [
			{
				letzdance_id: '',
				img: '',
				slug: '',
				title: 'Zumba',
				isFinished: false,
				time: '',
				link: ''
			}
		],
		"05-10-2020": [
			{
				letzdance_id: '',
				img: '',
				slug: '',
				title: 'Bollywood',
				is_finished: true,
				link: '',
				review: 4.5,
				time: '10.00 AM'
			},
			{
				letzdance_id: '',
				img: '',
				slug: '',
				title: 'Hiphop',
				is_finished: true,
				link: '',
				review: null,
				time: '04.00 PM'
			},
		]
	},
	message: ''
}