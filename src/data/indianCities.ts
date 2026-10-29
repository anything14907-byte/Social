export interface IndianRegion {
  pincode: string;
  city: string;
  state: string;
  craftSpecialty: string;
}

export const INDIAN_REGIONS: IndianRegion[] = [
  { pincode: '302001', city: 'Jaipur', state: 'Rajasthan', craftSpecialty: 'Blue Pottery & Gemstones' },
  { pincode: '221001', city: 'Varanasi', state: 'Uttar Pradesh', craftSpecialty: 'Banarasi Zari Handlooms' },
  { pincode: '560034', city: 'Bengaluru', state: 'Karnataka', craftSpecialty: 'Tech & Artisan Coffee' },
  { pincode: '400050', city: 'Mumbai', state: 'Maharashtra', craftSpecialty: 'Bespoke Fashion & Leather' },
  { pincode: '395002', city: 'Surat', state: 'Gujarat', craftSpecialty: 'Textiles & Diamond Polishing' },
  { pincode: '631501', city: 'Kanchipuram', state: 'Tamil Nadu', craftSpecialty: 'Kanjeevaram Mulberry Silk' },
  { pincode: '244001', city: 'Moradabad', state: 'Uttar Pradesh', craftSpecialty: 'Brass & Metal Craft' },
  { pincode: '247001', city: 'Saharanpur', state: 'Uttar Pradesh', craftSpecialty: 'Carved Woodwork' },
  { pincode: '190001', city: 'Srinagar', state: 'Jammu & Kashmir', craftSpecialty: 'Pashmina & Walnut Wood' },
  { pincode: '682001', city: 'Kochi', state: 'Kerala', craftSpecialty: 'Organic Spices & Coir' },
  { pincode: '500033', city: 'Hyderabad', state: 'Telangana', craftSpecialty: 'Bidriware & Pearls' },
  { pincode: '110001', city: 'New Delhi', state: 'Delhi NCR', craftSpecialty: 'Artisanal Studio Workshops' },
];

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi NCR',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];
