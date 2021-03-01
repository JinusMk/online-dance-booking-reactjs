export const imageBasePath = 'https://letzdance-fe.s3.us-east-2.amazonaws.com/';
export const DEV_BASE_URL = process.env.REACT_APP_BASE_URL
  ? process.env.REACT_APP_BASE_URL
  : 'https://admin2.letzdance.co/api/4/';

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
    reviwed_by: 'Neeti Singh',
    rating: '4',
    media: '',
    description:
      'I have been attending Zumba for couple of years, I came across this site for online Zumba. The instructor was good, the session was peppy and a good workout.',
    class_date: '01-07-2020',
    category: 'zumba'
  },
  {
    id: '',
    reviwed_by: 'Amrita',
    rating: '5',
    media: '',
    description:
      'The Zumba session was fab… awesome energy and super workout. The instructor guided us with the steps and checked if we are doing it right.. thank u..',
    class_date: '01-08-2020',
    category: 'zumba'
  },
  {
    id: '',
    reviwed_by: 'Shruti Nair',
    rating: '4',
    media: '',
    description:
      'This is the first time I am attending Zumba, when the session started I was feeling it’s high intensity but eventually when I took few breaks for a min and continued i had so much fun and its helping me in my weight loss. can’t wait for my next session.',
    class_date: '13-08-2020',
    category: 'zumba'
  },
  {
    id: '',
    reviwed_by: 'Vivek Kumar',
    rating: '5',
    media: '',
    description:
      'The instructor gave clear step by step instruction and made it super easy to learn. I thought I had a left feet but the first class gave me an enormous confidence.',
    class_date: '02-08-2020',
    category: 'bollywood'
  },
  {
    id: '',
    reviwed_by: 'Vaishali',
    rating: '5',
    media: '',
    description:
      'Loved the way how every part of choreography was easily broken down to easy simple steps. I am super happy that I am able to dance to my favourite song now! Thank you!',
    class_date: '03-10-2020',
    category: 'bollywood'
  },
  {
    id: '',
    reviwed_by: 'Shilpa Raheja',
    rating: '5',
    media: '',
    description:
      'I had a very good online Bollywood class with Manas, can’t wait for my next..',
    class_date: '17-07-2020',
    category: 'bollywood'
  },
  {
    id: '',
    reviwed_by: 'Priyanka Bhavani',
    rating: '4',
    media: '',
    description:
      'Loved the hiphop class, awesome instructor. I would like to join the regular sessions and learn hiphop. thank you.',
    class_date: '17-09-2020',
    category: 'hip-hop'
  },
  {
    id: '',
    reviwed_by: 'Nilesh',
    rating: '5',
    media: '',
    description:
      'I booked the class for my son who has a passion to dance but gets bored very quickly, I found this class more convenient as its online from home. my son seems to be interested as they introduce new steps and style in every class.',
    class_date: '04-10-2020',
    category: 'hip-hop'
  },
  {
    id: '',
    reviwed_by: 'Akrit',
    rating: '5',
    media: '',
    description:
      'This is the first time I am trying an online Hiphop session, I never thought it would be so much fun! The instructor was so patient and he taught every step until everyone got it right. Its rare to find someone so patient and motivating. Thanks for a wonderful session…',
    class_date: '15-09-2020',
    category: 'hip-hop'
  },
  {
    id: '',
    reviwed_by: 'Gurmeet Singh',
    rating: '5',
    media: '',
    description:
      'Great option to keep the kids active and learn dancing from home. Its very convenient no worry of being late or traffic! She is enjoying every class.. Looking forward to more classes.',
    class_date: '17-09-2020',
    category: 'bollywood-kids'
  },
  {
    id: '',
    reviwed_by: 'Niveditha',
    rating: '4',
    media: '',
    description:
      'Very nice concept, my daughter enjoyed the class… very convenient. The instructor is very good and polite. Thank you.',
    class_date: '01-10-2020',
    category: 'bollywood-kids'
  },
  {
    id: '',
    reviwed_by: 'Swetha',
    rating: '5',
    media: '',
    description:
      'I never though I can make my kid be attentive for an online class as he is always running around but you guys proved me wrong. He stayed the whole time during the online dance session and he thoroughly enjoyed. Thank you.',
    class_date: '06-10-2020',
    category: 'bollywood-kids'
  }
];

export const instructorsData = [
  {
    id: '',
    name: 'Angel Bensy',
    qualification: 'ZIN Certified',
    experience: '5',
    rating: '4.5',
    rating_count: 23,
    no_of_classes: 51,
    category: 'zumba',
    img: `${imageBasePath}Angel_zumba.jpg`
  },
  {
    id: '',
    name: 'Manas',
    qualification: 'Guinness Record Holder',
    experience: '10',
    rating: '5',
    rating_count: 57,
    no_of_classes: 79,
    category: 'bollywood',
    img: `${imageBasePath}Manas_bollywood.jpg`
  },
  {
    id: '',
    name: 'Arun',
    qualification: 'Expert Dance Master',
    experience: '6',
    rating: '4.5',
    rating_count: 27,
    no_of_classes: 31,
    category: 'bollywood-kids',
    img: `${imageBasePath}Arun_bollywood-kids.jpeg`
  },
  {
    id: '',
    name: 'Tony',
    qualification: 'Award winning Choreographer ',
    experience: '9',
    rating: '4.5',
    rating_count: 34,
    no_of_classes: 43,
    category: 'hip-hop',
    img: `${imageBasePath}Deena_hiphop.jpg`
  },
  {
    id: '',
    name: 'Tony',
    qualification: 'Award winning Choreographer ',
    experience: '9',
    rating: '4.5',
    rating_count: 34,
    no_of_classes: 43,
    category: 'hiphop-kids',
    img: `${imageBasePath}Deena_hiphop.jpg`
  }
];

export const lastWeekRecapVideos = [
    {
      id: '',
      img: `${imageBasePath}zumba_logo_2.svg`,
      category: 'zumba',
      instructor: 'Angel Bensy',
      participants: '22',
      date: '14 Oct 2020',
      media: `${imageBasePath}zumba_recap_1.mp4`
    },
    {
      id: '',
      img: `${imageBasePath}bollywood_logo_2.svg`,
      category: 'bollywood',
      instructor: 'Manas',
      participants: '21',
      date: '16 Oct 2020',
      media: `${imageBasePath}bollywood_recap_1.mp4`
    },
    {
      id: '',
      img: `${imageBasePath}hip-hop_logo_2.svg`,
      category: 'hip-hop',
      instructor: 'Tony',
      participants: '12',
      date: '15 Oct 2020',
      media: `${imageBasePath}hip-hop_recap_1.mp4`
    },
    {
      id: '',
      img: `${imageBasePath}bollywood-kids_logo_2.svg`,
      category: 'bollywood-kids',
      instructor: 'Manas',
      participants: '12',
      date: '12 Oct 2020',
      media: `${imageBasePath}bollywood-kids_recap_1.mp4`
    },
    {
      id: '',
      img: `${imageBasePath}zumba_logo_1.svg`,
      category: 'zumba',
      instructor: 'Angel Bensy',
      participants: '27',
      date: '17 Oct 2020',
      media: `${imageBasePath}zumba_recap_2.mp4`
    },
    {
      id: '',
      img: `${imageBasePath}hip-hop_logo_1.svg`,
      category: 'hip-hop',
      instructor: 'Tony',
      participants: '16',
      date: '16 Oct 2020',
      media: `${imageBasePath}hip-hop_recap_2.mp4`
    },
    {
      id: '',
      img: `${imageBasePath}bollywood_logo_1.svg`,
      category: 'bollywood',
      instructor: 'Manas',
      participants: '23',
      date: '18 Oct 2020',
      media: `${imageBasePath}bollywood_recap_2.mp4`
    },
    {
      id: '',
      img: `${imageBasePath}bollywood-kids_logo_1.svg`,
      category: 'bollywood-kids',
      instructor: 'Manas',
      participants: '19',
      date: '14 Oct 2020',
      media: `${imageBasePath}bollywood-kids_recap_2.mp4`
    }
];

export const danceCategory = {
  1: 'bollywood',
  2: 'hip-hop',
  3: 'zumba',
  4: 'bollywood-kids',
  5: 'hiphop-kids'
};
export const categorySlug = {
  bollywood: 1,
  'hip-hop': 2,
  zumba: 3,
  'bollywood-kids': 4,
  'hiphop-kids': 5
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

export const participantsCount = {
  zumba: 102,
  bollywood: 93,
  'hip-hop': 75,
  'bollywood-kids': 126,
  'hiphop-kids': 97
};
