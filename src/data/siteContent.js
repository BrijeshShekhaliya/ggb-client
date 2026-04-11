import {
  FiAlertCircle,
  FiBell,
  FiBookOpen,
  FiBriefcase,
  FiCreditCard,
  FiDollarSign,
  FiDownload,
  FiFileText,
  FiGlobe,
  FiGrid,
  FiHome,
  FiInfo,
  FiLayers,
  FiMapPin,
  FiMonitor,
  FiPhone,
  FiShield,
  FiUsers,
} from 'react-icons/fi'
import { LuLandPlot, LuPiggyBank, LuSprout } from 'react-icons/lu'
import { HiOutlineBuildingLibrary } from 'react-icons/hi2'
import { MdOutlineDirectionsCar, MdOutlineSchool } from 'react-icons/md'

export const officialBaseUrl = 'https://www.ggb.bank.in'
export const ebankingUrl = 'https://ggbib.ggb.bank.in/'

export const headerContent = {
  logo: `${officialBaseUrl}/webdata/img/newlogofinal.png`,
  gujaratiName: 'ગુજરાત ગ્રામિણ બેંક',
  englishName: 'GUJARAT GRAMIN BANK',
  subtitle: 'Scheduled Bank Owned by Government',
  actions: [
    {
      label: 'E-banking Login',
      href: ebankingUrl,
      icon: FiGlobe,
    },
    {
      label: 'Positive Pay System',
      href: `${officialBaseUrl}/pps.php`,
      icon: FiShield,
    },
    {
      label: 'Locate Us',
      href: `${officialBaseUrl}/location.php`,
      icon: FiMapPin,
    },
    {
      label: 'Contact Us',
      href: `${officialBaseUrl}/offices-branches.php`,
      icon: FiPhone,
    },
  ],
}

export const heroContent = {
  title: 'Gujarat Gramin Bank',
  subtitle: 'Scheduled Bank Owned by Government',
  description:
    'Gujarat Gramin Bank having its presence of 745 branches in 34 districts and leading the way in many of the opportunity in the area operation.',
  ctaLabel: 'Read More',
  ctaTo: '/about',
}

export const navContent = [
  {
    label: 'Home',
    to: '/',
    icon: FiHome,
  },
  {
    label: 'About Us',
    to: '/about',
    icon: FiUsers,
    items: [
      { label: 'History', href: `${officialBaseUrl}/history.php` },
      {
        label: 'Mission & Vision',
        href: `${officialBaseUrl}/mission-vision.php`,
      },
      {
        label: 'Board of Directors',
        href: `${officialBaseUrl}/board-of-directors.php`,
      },
      {
        label: 'Chairman Message',
        href: `${officialBaseUrl}/chairman-message.php`,
      },
      {
        label: 'Management Team',
        href: `${officialBaseUrl}/our-management-team.php`,
      },
      {
        label: 'CVO',
        href: `${officialBaseUrl}/cvo.php`,
      },
      {
        label: 'Offices & Branches',
        href: `${officialBaseUrl}/offices-branches.php`,
      },
      {
        label: 'Awards',
        href: `${officialBaseUrl}/awards.php`,
      },
    ],
  },
  {
    label: 'Products',
    to: '/products',
    icon: FiDollarSign,
    items: [
      { label: 'Loan Schemes', to: '/loans' },
      {
        label: 'Deposit Schemes',
        href: `${officialBaseUrl}/deposit-schemes.php`,
      },
      {
        label: 'Interest Rates & Charges',
        href: `${officialBaseUrl}/interest-rate-service-and-charges.php`,
      },
    ],
  },
  {
    label: 'Services',
    to: '/services',
    icon: FiBriefcase,
    items: [
      {
        label: 'Government Schemes',
        href: `${officialBaseUrl}/government-schemes.php`,
      },
      { label: 'BCSBI', href: `${officialBaseUrl}/bcsbi.php` },
      {
        label: 'Unclaimed Deposits',
        href: `${officialBaseUrl}/unclaimed-deposits.php`,
      },
      { label: 'Aadhaar', href: `${officialBaseUrl}/adhar.php` },
      { label: 'Forms', href: `${officialBaseUrl}/download-form.php` },
      { label: 'Positive Pay System', href: `${officialBaseUrl}/pps.php` },
    ],
  },
  {
    label: 'Digital',
    to: '/digital',
    icon: FiMonitor,
    items: [
      { label: 'GGB Connect', href: `${officialBaseUrl}/mconnect.php` },
      { label: 'IMPS', href: `${officialBaseUrl}/imps.php` },
      { label: 'SMS Alerts', href: `${officialBaseUrl}/sms-alert.php` },
      { label: 'Rupay Card', href: `${officialBaseUrl}/rupay-card.php` },
      { label: 'Offers', href: `${officialBaseUrl}/offers.php` },
      {
        label: 'Miss Call Facility',
        href: `${officialBaseUrl}/miss-call-facility.php`,
      },
      { label: 'Micro ATM', to: '/digital' },
      { label: 'E-Banking', href: `${officialBaseUrl}/e-banking.php` },
      { label: 'NACH', to: '/digital' },
      { label: 'NEFT/RTGS', href: `${officialBaseUrl}/neft-rtgs.php` },
      { label: 'AEPS', href: `${officialBaseUrl}/aeps.php` },
      { label: 'UPI BHIM', href: `${officialBaseUrl}/bhim-app.php` },
      {
        label: 'Security & Safety',
        href: `${officialBaseUrl}/security-safety.php`,
      },
    ],
  },
  {
    label: 'Publications',
    to: '/publications',
    icon: FiBookOpen,
    items: [
      {
        label: 'Annual Report 2024-2025',
        href: `${officialBaseUrl}/webdata/pdf/bggb_Annual_Report-2025.pdf`,
      },
      {
        label: 'ESGB Annual Report 2024-2025',
        href: `${officialBaseUrl}/webdata/pdf/SGB_Annual_Report-2024-25.pdf`,
      },
      {
        label: 'Annual Report 2023-2024',
        href: `${officialBaseUrl}/webdata/pdf/BGGB_ANNUAL REPORT-2024.pdf`,
      },
      {
        label: 'Annual Report 2022-2023',
        href: `${officialBaseUrl}/webdata/pdf/Annual Report 2022-23.pdf`,
      },
      {
        label: 'Annual Report 2021-2022',
        href: `${officialBaseUrl}/webdata/pdf/Annual Report 2021-22.pdf`,
      },
      {
        label: 'Annual Report 2020-2021',
        href: `${officialBaseUrl}/webdata/pdf/Annual Report 2020-21.pdf`,
      },
    ],
  },
  {
    label: 'Announcements',
    to: '/announcements',
    icon: FiBell,
    items: [
      { label: 'Tender', href: `${officialBaseUrl}/tenders.php` },
      { label: 'Recruitment', href: `${officialBaseUrl}/recru.php` },
      { label: 'E-auction', href: `${officialBaseUrl}/e_auction.php` },
      {
        label: 'E-Auctions Archival',
        href: `${officialBaseUrl}/e_auction_archieve.php`,
      },
      { label: 'Notice Board', href: `${officialBaseUrl}/announcements.php` },
      {
        label: 'आपकी पूंजी, आपका अधिकार',
        href: `${officialBaseUrl}/aapkipunji.php`,
      },
    ],
  },
  {
    label: 'Amalgamation',
    to: '/amalgamation',
    icon: FiLayers,
    highlight: true,
    items: [
      {
        label: 'Gazzate Notification',
        href: `${officialBaseUrl}/webdata/pdf/Amalgmation2025.pdf`,
      },
      {
        label: 'FAQs',
        href: `${officialBaseUrl}/webdata/pdf/FAQ for Customers 29-09-2025_Final.pdf`,
      },
      {
        label: 'Technical Amalgamation',
        href: `${officialBaseUrl}/webdata/pdf/Amalgmation2025.pdf`,
      },
    ],
  },
]

export const sectionPageContent = {
  about: {
    title: 'About Us',
    icon: FiUsers,
    items: navContent[1].items,
  },
  products: {
    title: 'Products',
    icon: FiDollarSign,
    items: navContent[2].items,
  },
  services: {
    title: 'Services',
    icon: FiBriefcase,
    items: navContent[3].items,
  },
  digital: {
    title: 'Digital',
    icon: FiMonitor,
    items: navContent[4].items,
  },
  publications: {
    title: 'Publications',
    icon: FiBookOpen,
    items: navContent[5].items,
  },
  announcements: {
    title: 'Announcements',
    icon: FiBell,
    items: navContent[6].items,
  },
  amalgamation: {
    title: 'Amalgamation',
    icon: FiLayers,
    items: navContent[7].items,
  },
}

export const homeAnnouncementItems = [
  { text: 'You can contact our call centre on 07968271260' },
  {
    text: 'Now, GGB provides option of selecting between floating and fixed rate of interest in personal loan segments. Please contact our nearest branch for details - GGB',
  },
  {
    text: 'CRP-RRB-XII : Recruitment of Officers(Scale -II)...',
    href: `${officialBaseUrl}/webdata/pdf/Website.pdf`,
  },
  {
    text: 'Operational Guideline for handover of collateral documents...',
    href: `${officialBaseUrl}/webdata/pdf/OPE%20Gudilene.pdf`,
  },
  {
    text: 'Click here to Visit National Portal For Credit linked Government Scheme',
    href: 'https://jansamarth.in',
  },
  {
    text: "Revision of service charges for cash withdrawal from other Bank's ATMs...",
    href: `${officialBaseUrl}/announcements.php`,
  },
  {
    text: 'Vehicle Auction Advertisement',
    href: `${officialBaseUrl}/webdata/img/Vehicle%20Auction%20Advertisement%2010-06-2020%20-.jpeg`,
  },
  {
    text: "Gujarat Gramin Bank (Employees') Pension Regulations, 2018",
    href: `${officialBaseUrl}/webdata/pdf/1546667440.pdf`,
  },
]

export const homeSlides = [
  {
    image:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80',
    alt: 'Customers reviewing banking documents at a desk',
  },
  {
    image:
      'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=1600&q=80',
    alt: 'Digital banking experience on laptop and mobile',
  },
  {
    image:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1600&q=80',
    alt: 'Banking advisory meeting in a professional office',
  },
]

export const homeQuickLinks = [
  {
    title: 'List of Branches',
    href: `${officialBaseUrl}/offices-branches.php`,
    icon: FiMapPin,
  },
  {
    title: 'Corporate Profile',
    href: `${officialBaseUrl}/about.php`,
    icon: FiInfo,
  },
  {
    title: 'Annual Report',
    href: `${officialBaseUrl}/webdata/pdf/bggb_Annual_Report-2025.pdf`,
    icon: FiFileText,
  },
]

export const homeExploreLinks = [
  {
    title: 'Schemes',
    to: '/loans',
    icon: FiDollarSign,
  },
  {
    title: 'Events',
    href: `${officialBaseUrl}/events.php`,
    icon: FiGrid,
  },
  {
    title: 'Press Release',
    href: `${officialBaseUrl}/press-releases.php`,
    icon: FiBookOpen,
  },
  {
    title: 'Service Charges',
    href: `${officialBaseUrl}/webdata/downloads/GGB%20Service%20Charge-Advances.pdf`,
    icon: FiDownload,
  },
]

export const bankIntroduction = {
  title: 'Gujarat Gramin Bank',
  text:
    'Gujarat Gramin Bank having its presence of 745 branches in 34 districts and leading the way in many of the opportunity in the area operation. We are perfectly positioned to support all section of customers. Our long history and deeply rooted presence in Gujarat makes us the Right Partner for needs on financial and other services.',
  readMore: '/about',
}

export const financialLiteracyItems = [
  {
    title: 'CKYC',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80',
    icon: FiShield,
  },
  {
    title: 'Economic awareness',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80',
    icon: LuPiggyBank,
  },
  {
    title: 'Financial knowledge',
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
    icon: HiOutlineBuildingLibrary,
  },
  {
    title: 'Financial education',
    image:
      'https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=900&q=80',
    icon: FiBookOpen,
  },
]

export const loanItems = [
  {
    title: 'Housing Loan',
    text: 'Home Loans for all types of your needs',
    icon: FiHome,
  },
  {
    title: 'Vehicle Loan',
    text: 'Vehicle Loans Designed to suit requirements to own a vehicle',
    icon: MdOutlineDirectionsCar,
  },
  {
    title: 'Agri Loan',
    text: 'Agri Loan from GGB',
    icon: LuSprout,
  },
  {
    title: 'Education Loan',
    text: 'Financial support for Higher Education',
    icon: MdOutlineSchool,
  },
  {
    title: 'Business Loan',
    text: 'Business Loans from GGB',
    icon: FiBriefcase,
  },
  {
    title: 'Personal Loan',
    text: 'Loans for your personal needs anytime',
    icon: FiUsers,
  },
  {
    title: 'Financial Inclusion Loan',
    text: 'Financial Inclusion Loan from GGB',
    icon: FiAlertCircle,
  },
  {
    title: 'Loans under Government Schemes',
    text: 'Loans under Government Schemes from GGB',
    icon: LuLandPlot,
  },
  {
    title: 'MSME Loans',
    text: 'MSME Loans from GGB',
    icon: FiCreditCard,
  },
]

export const connectLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/gujaratggb/',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/gujaratggb',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UC-rJybFzLXPIM-XkreY2cKQ',
  },
]

export const footerLinkGroups = [
  {
    title: 'About Us',
    items: [
      { label: 'RTI Act 2005', href: `${officialBaseUrl}/rti-act-2.php` },
      { label: 'eBGGB RTI Act 2005', href: `${officialBaseUrl}/ebggb-rti-act-2.php` },
      { label: 'eSGB RTI Act 2005', href: `${officialBaseUrl}/esgb-rti-act-2.php` },
      {
        label: 'Grievance Redressal Officer',
        href: `${officialBaseUrl}/grievance.php`,
      },
      {
        label: 'Nodal Officer-NEFT Return Transaction',
        href: `${officialBaseUrl}/neftnodal.php`,
      },
      {
        label: 'Pension & Computer Increment Grievance Cell',
        href: `${officialBaseUrl}/grievancePensionCompIncre.php`,
      },
      {
        label: 'SC/ST, PWDs, OBC & Ex-Servicemen Liaison Officer',
        href: `${officialBaseUrl}/SC_ST_LiaisonOfficer.php`,
      },
      {
        label: 'PoSH Committee',
        href: `${officialBaseUrl}/SexualHarassmentofWomenCommittee.php`,
      },
      {
        label: 'Holiday List',
        href: `${officialBaseUrl}/webdata/pdf/HoliDayList2025.pdf`,
      },
      {
        label: 'Reservation Register 2025',
        href: `${officialBaseUrl}/webdata/pdf/Roster 31.12.2025.pdf`,
      },
    ],
  },
  {
    title: 'Top Links',
    items: [
      { label: 'Announcements', href: `${officialBaseUrl}/announcements.php` },
      { label: 'Download Forms', href: `${officialBaseUrl}/download-form.php` },
      { label: 'Media', href: `${officialBaseUrl}/events.php` },
      { label: 'Tenders', href: `${officialBaseUrl}/tenders.php` },
      { label: 'Other Links', href: `${officialBaseUrl}/other-links.php` },
      { label: 'Sitemap', href: `${officialBaseUrl}/sitemap.php` },
    ],
  },
  {
    title: 'Navigate',
    items: [
      { label: 'Home', to: '/' },
      { label: 'Loan Schemes', to: '/loans' },
      { label: 'Event Gallery', href: `${officialBaseUrl}/events.php` },
      { label: 'Tender', href: `${officialBaseUrl}/tenders.php` },
      { label: 'Recruitment', href: `${officialBaseUrl}/announcements.php` },
      { label: 'Notice Board', href: `${officialBaseUrl}/announcements.php` },
      { label: 'Announcements', to: '/announcements' },
      { label: 'Contact', href: `${officialBaseUrl}/offices-branches.php` },
    ],
  },
  {
    title: 'Important Links',
    items: [
      {
        label: 'Press Releases',
        href: `${officialBaseUrl}/press-releases.php`,
      },
      {
        label: 'Services Charges',
        href: `${officialBaseUrl}/webdata/downloads/servicecharges1.pdf`,
      },
      {
        label: "Bank's Commitment to Customers",
        href: `${officialBaseUrl}/webdata/pdf/bank-commitment-to-customers.pdf`,
      },
      {
        label: 'SARFAESI Act Assets',
        href: `${officialBaseUrl}/webdata/pdf/SARFAESI detail 28-02-2026.pdf`,
      },
      {
        label: 'Security Repossession Policy-2025',
        href: `${officialBaseUrl}/webdata/pdf/Security Repossession & collection of dues Policy.pdf`,
      },
      {
        label: 'Government Schemes',
        href: `${officialBaseUrl}/GS.php`,
      },
      {
        label: 'Unclaimed Deposits',
        href: `${officialBaseUrl}/unclaimed-deposits.php`,
      },
      {
        label: 'EMI Calculator',
        href: `${officialBaseUrl}/emi-calculator.php`,
      },
      {
        label: 'APR Calculator',
        href: `${officialBaseUrl}/apr-calculator.php`,
      },
      {
        label: 'NRI Branches',
        href: `${officialBaseUrl}/nri-branches.php`,
      },
      {
        label: 'Reserve Bank - Integrated Ombudsman Scheme, 2021',
        href: `${officialBaseUrl}/banking-ombudsman-scheme.php`,
      },
      {
        label: 'Periodic Updation of KYC (ReKYC)',
        href: `${officialBaseUrl}/ReKYC.php`,
      },
    ],
  },
  {
    title: 'Other Links',
    items: [
      {
        label: 'RBI Trade Relief Measures Directions, 2025',
        href: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12921&Mode=0',
      },
      {
        label: 'Bharat Aadhaar Seeding Enabler',
        href: `${officialBaseUrl}/base_nach.php`,
      },
      { label: 'Complaints', to: '/complaints' },
      { label: 'Suggestions', href: `${officialBaseUrl}/suggestions.php` },
      {
        label: 'Privacy Policy',
        href: `${officialBaseUrl}/privacy-policy.php`,
      },
      {
        label: 'Customer Right Policy 2.0',
        href: `${officialBaseUrl}/webdata/pdf/Customer Right Policy 2.0.pdf`,
      },
      { label: 'Disclaimer', href: `${officialBaseUrl}/disclaimer.php` },
      {
        label: 'Customer Service Information',
        href: `${officialBaseUrl}/CustomerServiceInformation.php`,
      },
      {
        label: 'Exchange of Currency Notes',
        href: `${officialBaseUrl}/ExchangeOfCurrencyNotes.php`,
      },
      { label: 'DICGC Details', href: `${officialBaseUrl}/DICGC_Details.php` },
      { label: 'FAQs', href: `${officialBaseUrl}/FAQ.php` },
    ],
  },
]
