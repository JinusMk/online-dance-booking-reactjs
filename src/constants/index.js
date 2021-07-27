export const imageBasePath = 'https://letzdance-fe.s3.us-east-2.amazonaws.com/';
export const DEV_BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL : 'https://admin2.letzdance.co/api/4/' ;
export const RAZOR_PAY_KEY = process.env.REACT_APP_RAZOR_PAY_KEY ? process.env.REACT_APP_RAZOR_PAY_KEY : 'rzp_live_UtKx1JTAC4kVlY'

export const currencySymbol = {
  INR: '₹',
  AUD: '$',
  NZD: '$',
  SGD: '$',
  MYR: 'RM',
  AED: 'د.إ',
  GBP: '£',
  USD: '$'
};

export const responsiveCarousel = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1279 },
    items: 3,
    partialVisibilityGutter: 40
  },
  desktop: {
    breakpoint: { max: 1279, min: 960 },
    items: 2,
    partialVisibilityGutter: 40
  },
  tablet: {
    breakpoint: { max: 959, min: 599 },
    items: 2,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: { max: 599, min: 0 },
    items: 1,
    partialVisibilityGutter: 40
  }
};

export const regExpression = {
  email: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/,
  digits: /^(0|[1-9][0-9]{0,9})$/,
  name: /^[a-zA-ZÀ-ÖØ-öø-ÿ -]{1,100}$/
};

export const reviewsData = [
  {
    id: '',
    reviwed_by: 'Priya',
    rating: '4',
    media: '',
    description:
      'I have been attending Online Zumba with you for a year now! I can’t believe I have transformed so much. I get so many complements from my friends. Keep it up 😊',
    class_date: '20-04-2021',
    category: 'zumba',
    categoryId : '',
    categoryId: '602240785d42a126b059ec24'
  },
  {
    id: '',
    reviwed_by: 'Tinie',
    rating: '5',
    media: '',
    description:
      'Online Zumba is so easy I am saving lot of time which I used to spend travelling to my class.',
    class_date: '08-04-2021',
    category: 'zumba',
    categoryId: '602240785d42a126b059ec24'
  },
  {
    id: '',
    reviwed_by: 'Sonakshi Manra',
    rating: '5',
    media: '',
    description:
      'Thank you Manas for an amazing Zumba session😊 Cheers👍',
    class_date: '01-04-2021',
    category: 'zumba',
    categoryId: '602240785d42a126b059ec24'
  },
  {
    id: '',
    reviwed_by: 'Kathryn',
    rating: '4',
    media: '',
    description:
      'I have lost 4 kgs just through Your Zumba classes. Happy😊👍 ',
    class_date: '25-03-2021',
    category: 'zumba',
    categoryId: '602240785d42a126b059ec24'
  },
  {
    id: '',
    reviwed_by: 'Pooja',
    rating: '4',
    media: '',
    description:
      'Nice workout session. Please introduce Bharatanatyam.',
    class_date: '14-03-2021',
    category: 'zumba',
    categoryId: '602240785d42a126b059ec24'
  },
  {
    id: '',
    reviwed_by: 'Reeta Kaur',
    rating: '5',
    media: '',
    description:
      'Had a fun session with my friends dancing online in your app. Please provide more group classes.',
    class_date: '01-03-2021',
    category: 'bollywood',
    categoryId: '602242c35d42a126b059ec25'
  },
  {
    id: '',
    reviwed_by: 'Vaishali',
    rating: '5',
    media: '',
    description:
      'Loved the way how every part of choreography was easily broken down to easy simple steps. I am super happy that I am able to dance to my favourite song now! Thank you!',
    class_date: '16-02-2021',
    category: 'bollywood',
    categoryId: '602242c35d42a126b059ec25'
  },
  {
    id: '',
    reviwed_by: 'Ary Liew',
    rating: '5',
    media: '',
    description:
      'My kids really enjoyed the Online Bollywood class. Thank you 🙏🏻',
    class_date: '02-02-2021',
    category: 'bollywood',
    categoryId: '602242c35d42a126b059ec25'
  },
  {
    id: '',
    reviwed_by: 'Dhanshika',
    rating: '5',
    media: '',
    description:
      'I am a Bollywood regular student attending classes for 7 months now. My dancing has improved so much over the months. The recorded sessions are helpful to practice at home',
    class_date: '29-01-2021',
    category: 'bollywood',
    categoryId: '602242c35d42a126b059ec25'
  },
  {
    id: '',
    reviwed_by: 'Paramjiit Kaur',
    rating: '4',
    media: '',
    description:
      'I have always wanted to learn Hiphop but was not sure if would be able to, but the Hiphop trial class was helpful in checking if in can. It so easy than I thought. Now I can join full time with you guys 😊 ',
    class_date: '20-01-2021',
    category: 'hip-hop',
    categoryId: '602243485d42a126b059ec27'
  },
  {
    id: '',
    reviwed_by: 'Vamsi',
    rating: '5',
    media: '',
    description:
      'Happy that I am able to clear my doubts then and there with the instructor while dancing. Good initiative👍',
    class_date: '05-01-2021',
    category: 'hip-hop',
    categoryId: '602243485d42a126b059ec27'

  },
  {
    id: '',
    reviwed_by: 'Akrit',
    rating: '5',
    media: '',
    description:
      'This is the first time I am trying an online Hiphop session, I never thought it would be so much fun! The instructor was so patient and he taught every step until everyone got it right. Its rare to find someone so patient and motivating. Thanks for a wonderful session…',
    class_date: '20-12-2020',
    category: 'hip-hop',
    categoryId: '602243485d42a126b059ec27'
  },
  {
    id: '',
    reviwed_by: 'Yunus Ali',
    rating: '5',
    media: '',
    description:
      'Good instructor 👍',
    class_date: '12-12-2020',
    category: 'hip-hop',
    categoryId: '602243485d42a126b059ec27'
  },
  {
    id: '',
    reviwed_by: 'Kalpana',
    rating: '5',
    media: '',
    description:
      'Super app ideal during a pandemic situation. Dance from home, good concept. All the best👍',
    class_date: '01-12-2020',
    category: 'hip-hop',
    categoryId: '602243485d42a126b059ec27'
  },
  {
    id: '',
    reviwed_by: 'Gurmeet Singh',
    rating: '5',
    media: '',
    description:
      'Great option to keep the kids active and learn dancing from home. Its very convenient no worry of being late or traffic! She is enjoying every class.. Looking forward to more classes.',
    class_date: '25-11-2020',
    category: 'bollywood-kids',
    categoryId: '602243025d42a126b059ec26'
  },
  {
    id: '',
    reviwed_by: 'Niveditha',
    rating: '4',
    media: '',
    description:
      'Very nice concept, my daughter enjoyed the class… very convenient. The instructor is very good and polite. Thank you.',
    class_date: '02-11-2020',
    category: 'bollywood-kids',
    categoryId: '602243025d42a126b059ec26'
  },
  {
    id: '',
    reviwed_by: 'Swetha',
    rating: '5',
    media: '',
    description:
      'I never though I can make my kid be attentive for an online class as he is always running around but you guys proved me wrong. He stayed the whole time during the online dance session and he thoroughly enjoyed. Thank you.',
    class_date: '06-10-2020',
    category: 'bollywood-kids',
    categoryId: '602243025d42a126b059ec26'
  },
  {
    id: '',
    reviwed_by: 'Chandu',
    rating: '5',
    media: '',
    description:
      'Very interactive online dance class. Limited crowd. Was able to learn better. Instructor cleared all my doubts.',
    class_date: '20-09-2020',
    category: 'bollywood-kids',
    categoryId: '602243025d42a126b059ec26'
  },
  {
    id: '',
    reviwed_by: 'Kshitija Mandavkar',
    rating: '5',
    media: '',
    description:
      'Me and my daughter had a fun Bollywood session. Good activity for parents with their kids from home.',
    class_date: '01-09-2020',
    category: 'bollywood-kids',
    categoryId: '602243025d42a126b059ec26'
  },
];

export const newReviewsData = [
  {
    name: 'Varun',
    rating: '5',
    media: '',
    description:"Both my sons are enjoying the class every week, the regular classes are better than the 1 hr class we attended",
    class_date: '20-04-2021',
    category: 'onlinehip-hop-kids',
    categoryName: "Online Hip-hop-kids",
    categoryId: '602243825d42a126b059ec28'
  },
  {
    name: 'Urvi Ashar',
    rating: '4.5',
    media: '',
    description:'Very good class by the instructor, he taught us step by step, very easy to follow. Thank you.',
    class_date: '17-04-2021',
    category: 'onlinehip-hop',
    categoryName: "Online Hip-hop",
    categoryId: '602243485d42a126b059ec27'
  },
  {
    name: 'Vanya jain',
    rating: '4.9',
    media: '',
    description:'Class was nice. Not as difficult as I thought. ',
    class_date: '26-03-2021',
    category: 'onlinehip-hop',
    categoryName: "Online Hip-hop",
    categoryId: '602243485d42a126b059ec27'
  },
  {
    name: 'Ramesh',
    rating: '4.9',
    media: '',
    description:"I like this class because theta teach you step by step and they follow a hip-hop syllabus,ideal for kids",
    class_date: '21-03-2021',
    category: 'onlinehip-hop-kids',
    categoryName: "Online Hip-hop-kids",
    categoryId: '602243825d42a126b059ec28'
  },
  {
    name: 'Anjali Arora',
    rating: '5',
    media: '',
    description:"Completely satisfied with your class, what fun i had. Always thought choreographies were difficult but I guess I was wrong. It was super easy.",
    class_date: '20-03-2021',
    category: 'onlinebollywood',
    categoryName: "Online Bollywood",
    categoryId: '602242c35d42a126b059ec25'
  },
  {
    name: "Norainei",
    rating: '3.5',
    media: '',
    description:'Enjoyed the workout, I felt tired after 40mins. May be as it’s my first time',
    class_date: '05-03-2021',
    category: 'onlinezumba',
    categoryName: "Online Zumba",
    categoryId: '602240785d42a126b059ec24'
  },
  {
    name: "Alyn Wong",
    rating: '4.9',
    media: '',
    description:'Nice workout. Burnt 300 KCALs.',
    class_date: '03-03-2021',
    category: 'onlinezumba',
    categoryName: "Online Zumba",
    categoryId: '602240785d42a126b059ec24'
  },
  {
    name: 'Mrinalini',
    rating: '4.9',
    media: '',
    description:'Had two Trial sessions for Zumba and Bollywood this helped me decide what’s right for me to achieve desired weight. Thanks.',
    class_date: '21-02-2021',
    category: 'onlinezumba',
    categoryName: "Online Zumba",
    categoryId: '602240785d42a126b059ec24'
  },
  {
    name: "Nanthini",
    rating: '4.9',
    media: '',
    description:'Fun workout session. Great group workout!',
    class_date: '12-02-2021',
    category: 'onlinezumba',
    categoryName: "Online Zumba",
    categoryId: '602240785d42a126b059ec24'
  },
  {
    name: 'Neeta',
    rating: '5',
    media: '',
    description:`Very ideal for kids, as they can learn from home. My kids really enjoyed your class`,
    class_date: "02-02-2021",
    category: 'onlinebollywood-kids ',
    categoryName: "Online Bollywood-kids",
    categoryId: '602243025d42a126b059ec26'
  },
  {
    name: 'Anish Gupta',
    rating: '4.8',
    media: '',
    description:`My son was so adamant to join this hip-hop, Iwas initially doubtful but I should say I am so happy I found the right class for my kid. Very talented and patient instructor `,
    class_date: '21-01-2021',
    category: 'onlinehip-hop-kids',
    categoryName: `Online Hip-hop-kids`,
    categoryId: '602243825d42a126b059ec28'
  },
  {
    name: 'Ananya',
    rating: '4.5',
    media: '',
    description:`Hiphop is good, my daughter was doing bollywood dance before now doing Hip-hop, very nice`,
    class_date: '13-01-2021',
    category: 'onlinehip-hop-kids',
    categoryName: `Online Hip-hop-kids`,
    categoryId: '602243825d42a126b059ec28'
  },
  {
    name: 'Kavya',
    rating: '4.9',
    media: '',
    description:'Very good hip-hop class, it was very easy to pick up steps.',
    class_date: '07-01-2021',
    category: 'onlinehip-hop',
    categoryName: `Online Hip-hop`,
    categoryId: '602243485d42a126b059ec27'
  },
  {
    name: 'Prita',
    rating: '4.8',
    media: '',
    description:`My son was so adamant to join this hip-hop, Iwas initially doubtful but I should say I am so happy I found the right class for my kid. Very talented and patient instructor `,
    class_date: '02-01-2021',
    category: 'onlinehip-hop-kids',
    categoryName: `Online Hip-hop-kids`,
    categoryId: '602243825d42a126b059ec28'
  },
  {
    name: `Sarita`,
    rating: '4.5',
    media: '',
    description:'Peppy songs, energetic dance workout session!',
    class_date: '30-12-2020',
    category: 'onlinezumba',
    categoryName: `Online Zumba`,
    categoryId: '602240785d42a126b059ec24'
  },
  {
    name: `Divya`,
    rating: '4.2',
    media: '',
    description:'I have been attending your class for 6 months now, this has really helped me in toning up and not just losing weight.',
    class_date: '01-12-2020',
    category: 'onlinezumba',
    categoryName: `Online Zumba`,
    categoryId: '602240785d42a126b059ec24'
  },
  {
    name: 'Sangeetha',
    rating: '4.8',
    media: '',
    description:`Very good initiative, it's so easy for me to learn online as with my college timings it was difficult for me to attend offline classes.`,
    class_date: '26-11-2020',
    category: 'onlinehip-hop',
    categoryName: `Online Hip-hop`,
    categoryId: '602243485d42a126b059ec27'
  },
  {
    name: 'Yashika Yadav ',
    rating: '4.5',
    media: '',
    description:'Had fun dancing to my favourite Bollywood song. Please teach Garmi song!',
    class_date: '10-10-2020',
    category: 'onlinebollywood',
    categoryName: `Online Bollywood`,
    categoryId: '602242c35d42a126b059ec25'
  },
  {
    name: 'Dinesh',
    rating: '4.5',
    media: '',
    description:'Good Hiphop class. Easy to learn',
    class_date: '05-10-2020',
    category: 'onlinehip-hop',
    categoryName: "Online Hip-Hop",
    categoryId: '602243485d42a126b059ec27',
  },
  {
    name: 'Kalpana',
    rating: '4.9',
    media: '',
    description:'Super app ideal during a pandemic situation. Dance from home, good concept. All the best👍',
    class_date: '24-08-2020',
    category: 'onlinehip-hop',
    categoryName: `Online Hip-hop`,
    categoryId: '602243485d42a126b059ec27'
  },
  {
    name: 'Reshmi',
    rating: '4.9',
    media: '',
    description:'Good Zumba session helped me relax 😊',
    class_date: '21-08-2020',
    category: 'onlinezumba',
    categoryName: "Online Zumba",
    categoryId: '602240785d42a126b059ec24'
  }
]

export const danceCategory = {
  1: 'bollywood',
  2: 'hip-hop',
  3: 'zumba',
  4: 'bollywood-kids',
  5: 'hiphop-kids'
};

export const USER_AUTH_ERRORCODE = {
  email: {
    0: '',
    1: 'ENTER YOUR EMAIL',
    4: 'ENTER A VALID EMAIL'
  },
  emailObj: {
    requiredFlag: true,
    regexPattern: regExpression.email
  },
  password: {
    0: '',
    1: 'ENTER YOUR PASSWORD'
  },
  passwordObj: {
    requiredFlag: true
  },
  name: {
    0: '',
    1: 'ENTER YOUR NAME'
  },
  nameObj: {
    requiredFlag: true
  },
  phone: {
    0: '',
    1: 'ENTER YOUR MOBILE NUMBER',
    2: 'ENTER A VALID MOBILE NUMBER',
    3: 'ENTER A VALID MOBILE NUMBER',
    4: 'ENTER A VALID MOBILE NUMBER'
  },
  phoneObj: {
    requiredFlag: true,
    minLength: 5,
    maxLength: 15
  }
};

export const privacyPolicyData = [
  {
    title: 'Information that is gathered from visitors',
    content: `In common with other websites, log files are stored on the web server saving details such as the visitor's IP address, browser type, referring page and time of visit. <br/><br/>Cookies may be used to remember visitor preferences when interacting with the website. <br/><br/>Where registration is required, the visitor's email, phone number, and a username will be stored on the server.`
  },
  {
    title: 'How the Information is used',
    content: `The information is used to enhance the vistor's experience when using the website to display personalised content and possibly advertising. <br/><br/>E-mail addresses, and phone numbers will not be sold, rented or leased to 3rd parties.<br/><br/>E-mail, SMS and WhatsApp may be sent to inform you of news of our services or offers by us or our affiliates.`
  },
  {
    title: 'Visitor Options',
    content: `If you have subscribed to one of our services, you may unsubscribe by following the instructions which are included in e-mail that you receive.<br/><br/>You may be able to block cookies via your browser settings but this may prevent you from access to certain features of the website.`
  },
  {
    title: 'Cookies',
    content: `Cookies are small digital signature files that are stored by your web browser that allow your preferences to be recorded when visiting the website. Also they may be used to track your return visits to the website.<br/><br/>3rd party advertising companies may also use cookies for tracking purposes.`
  }
];

// export const participantsCount = {
//   zumba: 102,
//   bollywood: 93,
//   'hip-hop': 75,
//   'bollywood-kids': 126,
//   'hiphop-kids': 97
// };

export const subscriptionBenefitsGeneral = ['All dance levels - from beginner to expert', '8 to 12 classes a month','All dance levels - from beginner to expert', '8 to 12 classes a month']

export const subscriptionBenefits = {
  '602240785d42a126b059ec24': [`Achieve fitness goal with our health tracker `, `Flexible timings on weekdays & Weekends`, '8 to 12 classes a month', 'Personalized attention and instructor feedback', 'Calorie count, progress tracker, and detailed statistics', 'Certification after every successful milestone'],
  '602242c35d42a126b059ec25': [`All dance levels - from beginner to expert`, `Class recording provided after every class`, '8 to 12 classes a month', 'Flexible timing on weekdays and weekends', 'Personalized attention and instructor feedback', 'Learn two complete song choreography', 'Calorie count, progress tracker, and detailed statistics', 'Certification after every successful milestone'],
  "602243485d42a126b059ec27" : [`All dance levels - from beginner to expert`, `Class recording provided after every class`, '8 classes a month', 'Flexible timing on weekdays and weekends', 'Personalized attention and instructor feedback', 'Learn two complete song choreography', 'Calorie count, progress tracker, and detailed statistics', 'Certification after every successful milestone'],
  "602243025d42a126b059ec26": [`All dance levels - from beginner to expert`, `Class recording provided after every class`, '8 to 12 classes a month', 'Flexible timing on weekdays and weekends', 'Personalized attention and instructor feedback', 'Learn two complete song choreography', 'Calorie count, progress tracker, and detailed statistics', 'Certification after every successful milestone'],
  "602243825d42a126b059ec28" : [`All dance levels - from beginner to expert`, `Class recording provided after every class`, '8 classes a month', 'Flexible timing on weekdays and weekends', 'Personalized attention and instructor feedback', 'Learn two complete song choreography', 'Calorie count, progress tracker, and detailed statistics', 'Certification after every successful milestone']
}

export const subscriptionCategories = [
  {
    label: 'Zumba',
    value: '602240785d42a126b059ec24'
  },
  {
    label: 'Bollywood',
    value: '602242c35d42a126b059ec25'
  },
  {
    label: 'Hip-Hop',
    value: '602243485d42a126b059ec27'
  },
  {
    label: 'Bollywood-kids',
    value: '602243025d42a126b059ec26'
  },
  {
    label: 'Hip-hop-kids',
    value: '602243825d42a126b059ec28'
  },
]