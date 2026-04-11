import { useEffect, useMemo, useState } from 'react'
import {
  FiAlertCircle,
  FiArrowDownRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiFileText,
  FiLayers,
  FiLock,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiSearch,
  FiShield,
  FiUpload,
  FiX,
} from 'react-icons/fi'
import { officialBaseUrl } from '../data/siteContent'
import './complaints.css'
import './complaints-mobile.css'

const relationOptions = ['Existing Customer', 'Non-Customer', 'Ex Staff']

const exStaffNames = [
  'A. K. Patel',
  'B. M. Shah',
  'C. R. Desai',
  'D. N. Parmar',
]

const districtOptions = ['Ahmedabad', 'Rajkot', 'Surat', 'Vadodara']

const branchOptionsByDistrict = {
  Ahmedabad: ['Ashram Road', 'Bopal', 'Maninagar', 'Naranpura'],
  Rajkot: ['Kalawad Road', 'Kuvadava Road', 'Mavdi', 'University Road'],
  Surat: ['Adajan', 'Piplod', 'Ring Road', 'Varachha'],
  Vadodara: ['Alkapuri', 'Karelibaug', 'Manjalpur', 'Waghodia Road'],
}

const complaintCatalog = {
  'Existing Customer': {
    Deposits: {
      'Account Service': ['General Complaint', 'Service Request Follow-up'],
      Charges: ['Charges Clarification', 'Refund Request'],
      'Branch Experience': ['Branch Staff Conduct', 'Delay in Service'],
    },
    Loans: {
      'Loan Service': ['Loan Servicing Issue', 'Loan Statement / Record'],
      'Disbursement / EMI': ['EMI / Debit Issue', 'Disbursement Delay'],
      Documentation: ['Document Update', 'Document Return Request'],
    },
    'ATM / Debit Card': {
      'Cash Withdrawal / Transaction': [
        'ATM Transaction',
        'Cash Withdrawal Dispute',
      ],
      'Card Issue': ['Card Not Working', 'Card Delivery / Replacement'],
    },
    'Digital Banking': {
      'Internet Banking': ['Login / Access Issue', 'Password / Access Reset'],
      'Mobile Banking / UPI': ['UPI / App Issue', 'Failed Digital Transaction'],
      'Failed Digital Transaction': [
        'Transaction Related',
        'Reversal / Refund Follow-up',
      ],
    },
    'Credit Information': {
      'Rectification Request': ['Credit Information Rectification'],
    },
  },
  'Non-Customer': {
    'General Banking': {
      'Information / Support': ['General Complaint'],
      'Service Feedback': ['Feedback / Suggestion'],
    },
    'Branch Service': {
      'Branch Experience': ['Branch Staff Conduct', 'Delay in Service'],
      Suggestions: ['Feedback / Suggestion'],
    },
  },
  'Ex Staff': {
    'Pension / PF': {
      Verification: ['Pension / PF Verification'],
      Records: ['Document Update'],
    },
    'General Administration': {
      'Staff Services': ['General Complaint', 'Service Request Follow-up'],
    },
  },
}

const heroHighlights = [
  {
    title: 'Complaint routing',
    text: 'Choose relation, service, issue category, and complaint type in the same guided order.',
    icon: FiLayers,
    tone: 'blue',
  },
  {
    title: 'Escalation help',
    text: 'Regional Office and Banking Ombudsman references stay visible throughout the flow.',
    icon: FiShield,
    tone: 'green',
  },
  {
    title: 'Status popup',
    text: 'Ticket status opens in a popup so the complaint form stays clean and focused.',
    icon: FiSearch,
    tone: 'orange',
  },
]

const guidanceLinks = [
  {
    title: 'Regional Office',
    text: 'If your complaint is unresolved at the branch level, approach our Regional Office.',
    href: `${officialBaseUrl}/offices-branches.php`,
    icon: FiMapPin,
    tone: 'blue',
    tag: 'Escalation',
    action: 'View office',
  },
  {
    title: 'Banking Ombudsman',
    text: 'If you are not satisfied with the bank grievance redressal, approach the Banking Ombudsman.',
    href: 'https://rbi.org.in/Scripts/Complaints.aspx',
    icon: FiShield,
    tone: 'green',
    tag: 'RBI Support',
    action: 'Open RBI',
  },
  {
    title: 'Customer Redressal Policy',
    text: 'Read the formal customer grievance redressal policy and service standards.',
    href: `${officialBaseUrl}/webdata/pdf/Grivance Redersal Policy.pdf`,
    icon: FiFileText,
    tone: 'purple',
    tag: 'Policy',
    action: 'Open policy',
  },
  {
    title: 'Ombudsman Scheme',
    text: 'Review the banking ombudsman scheme document for complaint escalation guidance.',
    href: `${officialBaseUrl}/webdata/pdf/BANKING OMBUDSMAN WEBSITE.pdf`,
    icon: FiLayers,
    tone: 'teal',
    tag: 'Reference',
    action: 'Open scheme',
  },
]

const initialFormData = {
  complainantType: '',
  exStaffName: '',
  exStaffPfNo: '',
  selection1: '',
  selection2: '',
  selection3: '',
  district: '',
  branch: '',
  accountNumber: '',
  firstName: '',
  lastName: '',
  atmCardNumber: '',
  atmBank: '',
  atmPlace: '',
  transactionDate: '',
  transactionAmount: '',
  transactionReference: '',
  mobileNumber: '',
  emailAddress: '',
  complaintDescription: '',
  complainantAddress: '',
  disputedValues: '',
  correctionRequired: '',
  updateAccountNumber: '',
  compensationAccountNumber: '',
  compensationBankName: '',
  compensationBranchName: '',
  compensationIfsc: '',
  seniorCitizenFlag: 'No',
}

function getModeFromSelection(selection3) {
  if (selection3 === 'Credit Information Rectification') {
    return 'credit'
  }

  if (
    selection3 === 'ATM Transaction' ||
    selection3 === 'Cash Withdrawal Dispute'
  ) {
    return 'atm'
  }

  if (
    selection3 === 'Transaction Related' ||
    selection3 === 'Reversal / Refund Follow-up' ||
    selection3 === 'EMI / Debit Issue'
  ) {
    return 'transaction'
  }

  return 'general'
}

function ComplaintsPage() {
  const [formData, setFormData] = useState(initialFormData)
  const [statusForm, setStatusForm] = useState({
    ticketId: '',
    mobileNumber: '',
  })
  const [statusMessage, setStatusMessage] = useState('')
  const [submitMessage, setSubmitMessage] = useState('')
  const [fileFeedback, setFileFeedback] = useState('')
  const [filePreview, setFilePreview] = useState('')
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [activeComplaintStep, setActiveComplaintStep] = useState(1)
  const [submissionReceipt, setSubmissionReceipt] = useState(null)

  const productOptions = useMemo(
    () => Object.keys(complaintCatalog[formData.complainantType] || {}),
    [formData.complainantType],
  )

  const queryOptions = useMemo(() => {
    const productGroup =
      complaintCatalog[formData.complainantType]?.[formData.selection1] || {}

    return Object.keys(productGroup)
  }, [formData.complainantType, formData.selection1])

  const typeOptions = useMemo(() => {
    const queryGroup =
      complaintCatalog[formData.complainantType]?.[formData.selection1]?.[
        formData.selection2
      ] || []

    return queryGroup
  }, [formData.complainantType, formData.selection1, formData.selection2])

  const formMode = useMemo(
    () => getModeFromSelection(formData.selection3),
    [formData.selection3],
  )

  const branchOptions = useMemo(
    () => branchOptionsByDistrict[formData.district] || [],
    [formData.district],
  )

  const needsExStaffVerification = formData.complainantType === 'Ex Staff'
  const showTransactionFields = formMode === 'transaction' || formMode === 'atm'
  const showAtmFields = formMode === 'atm'
  const showCreditFields = formMode === 'credit'
  const isRouteLocked = activeComplaintStep === 2
  const isStepOneReady = Boolean(
    formData.complainantType &&
      formData.selection1 &&
      formData.selection2 &&
      formData.selection3 &&
      (!needsExStaffVerification ||
        (formData.exStaffName.trim() && formData.exStaffPfNo.trim())),
  )
  const routeTiles = [
    {
      label: 'Relation With Bank',
      value: formData.complainantType || 'Select relation',
    },
    {
      label: 'Product / Service',
      value: formData.selection1 || 'Select service',
    },
    {
      label: 'Query Related To',
      value: formData.selection2 || 'Select issue group',
    },
    {
      label: 'Type of Query',
      value: formData.selection3 || 'Select complaint type',
    },
  ]
  const routeText =
    [
      formData.complainantType,
      formData.selection1,
      formData.selection2,
      formData.selection3,
    ]
      .filter(Boolean)
      .join(' / ') || 'Complete the complaint route above to load the correct form fields.'
  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview)
      }
    }
  }, [filePreview])

  useEffect(() => {
    if (!isStatusModalOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsStatusModalOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isStatusModalOpen])

  const handleFlowChange = (field, value) => {
    setSubmitMessage('')
    setSubmissionReceipt(null)

    setFormData((currentValue) => {
      const nextValue = { ...currentValue, [field]: value }

      if (field === 'complainantType') {
        nextValue.selection1 = ''
        nextValue.selection2 = ''
        nextValue.selection3 = ''
        nextValue.exStaffName = ''
        nextValue.exStaffPfNo = ''
      }

      if (field === 'selection1') {
        nextValue.selection2 = ''
        nextValue.selection3 = ''
      }

      if (field === 'selection2') {
        nextValue.selection3 = ''
      }

      if (field === 'district') {
        nextValue.branch = ''
      }

      return nextValue
    })

    if (
      field === 'complainantType' ||
      field === 'selection1' ||
      field === 'selection2' ||
      field === 'selection3'
    ) {
      setActiveComplaintStep(1)
    }
  }

  const handleFieldChange = (field, value) => {
    setSubmitMessage('')
    setSubmissionReceipt(null)
    setFormData((currentValue) => ({
      ...currentValue,
      [field]: value,
    }))
  }

  const handleDistrictChange = (value) => {
    setSubmitMessage('')
    setSubmissionReceipt(null)
    setFormData((currentValue) => ({
      ...currentValue,
      district: value,
      branch: '',
    }))
  }

  const handleStatusFieldChange = (field, value) => {
    setStatusMessage('')
    setStatusForm((currentValue) => ({
      ...currentValue,
      [field]: value,
    }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]

    setFileFeedback('')

    if (filePreview) {
      URL.revokeObjectURL(filePreview)
      setFilePreview('')
    }

    if (!file) {
      return
    }

    const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
    const validExtensions = ['.jpg', '.jpeg']
    const fileSizeKb = Math.round(file.size / 1024)

    if (!validExtensions.includes(extension)) {
      setFileFeedback('Only JPG and JPEG files are accepted for preview.')
      event.target.value = ''
      return
    }

    if (fileSizeKb < 10 || fileSizeKb > 500) {
      setFileFeedback(
        `Selected file is ${fileSizeKb} KB. Please upload a file between 10 KB and 500 KB.`,
      )
      event.target.value = ''
      return
    }

    setFileFeedback(`Attached ${file.name} (${fileSizeKb} KB).`)
    setFilePreview(URL.createObjectURL(file))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const requiredFields = [
      formData.complainantType,
      formData.selection1,
      formData.selection2,
      formData.selection3,
      formData.district,
      formData.branch,
      formData.firstName,
      formData.lastName,
      formData.mobileNumber,
      formData.emailAddress,
    ]

    if (needsExStaffVerification) {
      requiredFields.push(formData.exStaffName, formData.exStaffPfNo)
    }

    if (showCreditFields) {
      requiredFields.push(
        formData.complainantAddress,
        formData.disputedValues,
        formData.correctionRequired,
        formData.updateAccountNumber,
      )
    } else {
      requiredFields.push(formData.complaintDescription)
    }

    if (requiredFields.some((value) => !String(value).trim())) {
      setSubmitMessage(
        'Please complete all required complaint details before submitting the form.',
      )
      return
    }

    handleConfirmSubmission()
  }

  const handleOpenStepTwo = () => {
    if (!isStepOneReady) {
      setSubmitMessage(
        'Complete the complaint route in Step 1 before moving to complaint details.',
      )
      return
    }

    setSubmitMessage('')
    setActiveComplaintStep(2)
  }

  const handleStatusCheck = () => {
    if (!statusForm.ticketId.trim() || !statusForm.mobileNumber.trim()) {
      setStatusMessage('Enter both the ticket ID and registered mobile number.')
      return
    }

    setStatusMessage(
      'Status lookup panel is ready for the live complaint-status service. Connect the existing backend endpoint to return ticket logs here.',
    )
  }

  const handleConfirmSubmission = () => {
    const now = new Date()
    const ticketId = `GGBC-${now.getFullYear()}${String(
      now.getMonth() + 1,
    ).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`

    setSubmissionReceipt({
      ticketId,
      submittedOn: now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      message:
        'Your complaint has been submitted successfully.',
    })
    setStatusForm((currentValue) => ({
      ticketId,
      mobileNumber: currentValue.mobileNumber || formData.mobileNumber,
    }))
    setSubmitMessage('')
  }

  return (
    <div className="complaints-page">
      <section className="complaints-hero" data-aos="fade-up">
        <div className="container">
          <div className="complaints-hero-shell">
            <div className="complaints-hero-copy">
              <span className="complaints-chip">Customer Support</span>
              <h1 className="complaints-title">Grievances, Complaints & Feedback</h1>
              <p className="complaints-description">
                Raise complaints, submit feedback, and continue the bank grievance
                process from one guided page that keeps the same complaint content
                and escalation flow.
              </p>

              <div className="complaints-hero-actions">
                <a className="complaints-primary-action" href="#complaints-intake">
                  Start Complaint
                  <FiArrowDownRight />
                </a>
                <button
                  className="complaints-secondary-action"
                  type="button"
                  onClick={() => setIsStatusModalOpen(true)}
                >
                  <FiSearch />
                  Check Status
                </button>
              </div>

              <div className="complaints-hero-points">
                {heroHighlights.map((item) => {
                  const Icon = item.icon

                  return (
                    <div className="complaints-hero-point-card" key={item.title}>
                      <span
                        className={`complaints-tone-badge complaints-tone-${item.tone}`}
                      >
                        <Icon />
                      </span>
                      <div className="complaints-hero-point-copy">
                        <strong>{item.title}</strong>
                        <span>{item.text}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="complaints-hero-media">
              <div className="complaints-hero-image-frame">
                <img
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80"
                  alt="Complaint support documents and service desk"
                />
                <div className="complaints-hero-overlay-card">
                  <span className="complaints-hero-overlay-chip">
                    Complaint Guidance
                  </span>
                  <strong>
                    Use the same complaint journey from the original grievance
                    page, now presented in a clearer and more structured layout.
                  </strong>
                </div>
              </div>

              <div className="complaints-hero-side-note">
                <h2>Before you submit</h2>
                <ul>
                  <li>Select relation, product, query category, and type of query.</li>
                  <li>Conditional fields appear for ATM, transaction, and credit rectification issues.</li>
                  <li>Use the status popup anytime without breaking the complaint form flow.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="complaints-guidance-section">
        <div className="container">
          <div className="complaints-guidance-card" data-aos="fade-up">
            <div className="complaints-guidance-head">
              <span className="complaints-panel-chip">Escalation Path</span>
              <h2>Grievance redressal references</h2>
              <p>
                These links keep the same reference material from the original
                complaint page and stay easy to access before you start filling the
                complaint form.
              </p>
            </div>

            <div className="complaints-reference-grid">
              {guidanceLinks.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    className="complaints-reference-card"
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="complaints-reference-head">
                      <span
                        className={`complaints-reference-icon complaints-tone-${item.tone}`}
                      >
                        <Icon />
                      </span>
                      <span className="complaints-reference-tag">{item.tag}</span>
                      <FiArrowUpRight className="complaints-reference-arrow" />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="complaints-reference-footer">
                      <span className="complaints-reference-footer-text">
                        {item.action}
                      </span>
                      <span className="complaints-reference-pill">
                        Open Link
                        <FiArrowUpRight />
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="complaints-main-section" id="complaints-intake">
        <div className="container">
          <form className="complaints-intake-card" onSubmit={handleSubmit}>
            <div className="complaints-intake-header" data-aos="fade-up">
              <div>
                <span className="complaints-panel-chip">Complaint Request</span>
                <h2>Tell us about your issue and submit the complaint</h2>
              </div>
              <p>
                This section combines the issue selection flow and the application
                form so the complaint journey is easier to follow from start to
                submission.
              </p>
            </div>

            {submissionReceipt ? (
              <div className="complaints-success-banner">
                <div className="complaints-success-copy">
                  <span className="complaints-panel-chip">Complaint Submitted</span>
                  <h3>Your complaint ticket has been created</h3>
                  <p>
                    {submissionReceipt.message} Complaint Ticket ID:{' '}
                    <strong>{submissionReceipt.ticketId}</strong>. Please take a
                    screenshot or note this ticket ID and use it in the Check
                    Status popup to track updates on your complaint.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="complaints-step-shell">
              <div className="complaints-step-panel">
                <div className="complaints-subsection-head">
                  <span className="complaints-subsection-kicker">Step 1</span>
                  <h3>Select complaint route</h3>
                  <p>
                    Select your relation with the bank, the service, the issue
                    category, and the complaint type first.
                  </p>
                </div>

                <div className="complaints-selector-grid">
                  <label className="complaints-field">
                    <span>Your Relation With Bank</span>
                    <select
                      className="complaints-select"
                      value={formData.complainantType}
                      disabled={isRouteLocked}
                      onChange={(event) =>
                        handleFlowChange('complainantType', event.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {relationOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  {needsExStaffVerification ? (
                    <>
                      <label className="complaints-field">
                        <span>Select Name</span>
                        <select
                          className="complaints-select"
                          value={formData.exStaffName}
                          disabled={isRouteLocked}
                          onChange={(event) =>
                            handleFieldChange('exStaffName', event.target.value)
                          }
                        >
                          <option value="">Select</option>
                          {exStaffNames.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="complaints-field">
                        <span>Enter Your PF Number</span>
                        <input
                          className="complaints-input"
                          type="text"
                          value={formData.exStaffPfNo}
                          disabled={isRouteLocked}
                          onChange={(event) =>
                            handleFieldChange('exStaffPfNo', event.target.value)
                          }
                        />
                      </label>
                    </>
                  ) : null}

                  <label className="complaints-field">
                    <span>Product / Service</span>
                    <select
                      className="complaints-select"
                      value={formData.selection1}
                      disabled={!formData.complainantType || isRouteLocked}
                      onChange={(event) =>
                        handleFlowChange('selection1', event.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {productOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="complaints-field">
                    <span>Query Related To</span>
                    <select
                      className="complaints-select"
                      value={formData.selection2}
                      disabled={!formData.selection1 || isRouteLocked}
                      onChange={(event) =>
                        handleFlowChange('selection2', event.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {queryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="complaints-field">
                    <span>Type of Query</span>
                    <select
                      className="complaints-select"
                      value={formData.selection3}
                      disabled={!formData.selection2 || isRouteLocked}
                      onChange={(event) =>
                        handleFlowChange('selection3', event.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {typeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="complaints-step-actions">
                  <button
                    className="complaints-primary-button"
                    type="button"
                    disabled={isRouteLocked}
                    onClick={handleOpenStepTwo}
                  >
                    {isRouteLocked ? 'Step 1 Locked' : 'Next'}
                    {isRouteLocked ? <FiLock /> : <FiArrowDownRight />}
                  </button>
                </div>
              </div>

              <div
                className={`complaints-step-panel complaints-step-two${
                  activeComplaintStep === 2 ? ' is-open' : ' is-locked'
                }`}
              >
                <div className="complaints-subsection-head complaints-subsection-head-wide">
                  <div>
                    <span className="complaints-subsection-kicker">Step 2</span>
                    <h3>Complaint details</h3>
                  </div>
                  <p>
                    Complete the applicant, account, and complaint information
                    below. The complaint details section opens after Step 1 is
                    completed.
                  </p>
                </div>

                {activeComplaintStep === 2 ? (
                  <div className="complaints-form-grid">
                <label className="complaints-field">
                  <span>District</span>
                  <select
                    className="complaints-select"
                    value={formData.district}
                    onChange={(event) => handleDistrictChange(event.target.value)}
                  >
                    <option value="">Select District</option>
                    {districtOptions.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="complaints-field">
                  <span>Branch</span>
                  <select
                    className="complaints-select"
                    value={formData.branch}
                    onChange={(event) =>
                      handleFieldChange('branch', event.target.value)
                    }
                    disabled={!formData.district}
                  >
                    <option value="">Select Branch</option>
                    {branchOptions.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="complaints-field">
                  <span>Account Number</span>
                  <input
                    className="complaints-input"
                    type="text"
                    value={formData.accountNumber}
                    onChange={(event) =>
                      handleFieldChange('accountNumber', event.target.value)
                    }
                  />
                </label>

                <label className="complaints-field">
                  <span>First Name</span>
                  <input
                    className="complaints-input"
                    type="text"
                    value={formData.firstName}
                    onChange={(event) =>
                      handleFieldChange('firstName', event.target.value)
                    }
                  />
                </label>

                <label className="complaints-field">
                  <span>Last Name</span>
                  <input
                    className="complaints-input"
                    type="text"
                    value={formData.lastName}
                    onChange={(event) =>
                      handleFieldChange('lastName', event.target.value)
                    }
                  />
                </label>

                <label className="complaints-field">
                  <span>Mobile Number</span>
                  <input
                    className="complaints-input"
                    type="text"
                    value={formData.mobileNumber}
                    onChange={(event) =>
                      handleFieldChange('mobileNumber', event.target.value)
                    }
                  />
                </label>

                <label className="complaints-field">
                  <span>Email Address</span>
                  <input
                    className="complaints-input"
                    type="email"
                    value={formData.emailAddress}
                    onChange={(event) =>
                      handleFieldChange('emailAddress', event.target.value)
                    }
                  />
                </label>

                <label className="complaints-field">
                  <span>Are You Senior Citizen?</span>
                  <select
                    className="complaints-select"
                    value={formData.seniorCitizenFlag}
                    onChange={(event) =>
                      handleFieldChange('seniorCitizenFlag', event.target.value)
                    }
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </label>

                {showAtmFields ? (
                  <>
                    <label className="complaints-field">
                      <span>ATM Card Number</span>
                      <input
                        className="complaints-input"
                        type="text"
                        value={formData.atmCardNumber}
                        onChange={(event) =>
                          handleFieldChange('atmCardNumber', event.target.value)
                        }
                      />
                    </label>

                    <label className="complaints-field">
                      <span>Bank of ATM</span>
                      <input
                        className="complaints-input"
                        type="text"
                        value={formData.atmBank}
                        onChange={(event) =>
                          handleFieldChange('atmBank', event.target.value)
                        }
                      />
                    </label>

                    <label className="complaints-field">
                      <span>Place of ATM</span>
                      <input
                        className="complaints-input"
                        type="text"
                        value={formData.atmPlace}
                        onChange={(event) =>
                          handleFieldChange('atmPlace', event.target.value)
                        }
                      />
                    </label>
                  </>
                ) : null}

                {showTransactionFields ? (
                  <>
                    <label className="complaints-field">
                      <span>Transaction Date</span>
                      <input
                        className="complaints-input"
                        type="date"
                        value={formData.transactionDate}
                        onChange={(event) =>
                          handleFieldChange('transactionDate', event.target.value)
                        }
                      />
                    </label>

                    <label className="complaints-field">
                      <span>Transaction Amount</span>
                      <input
                        className="complaints-input"
                        type="text"
                        value={formData.transactionAmount}
                        onChange={(event) =>
                          handleFieldChange('transactionAmount', event.target.value)
                        }
                      />
                    </label>

                    <label className="complaints-field">
                      <span>Reference Number</span>
                      <input
                        className="complaints-input"
                        type="text"
                        value={formData.transactionReference}
                        onChange={(event) =>
                          handleFieldChange(
                            'transactionReference',
                            event.target.value,
                          )
                        }
                      />
                    </label>
                  </>
                ) : null}

                {showCreditFields ? (
                  <>
                    <label className="complaints-field complaints-field-full">
                      <span>Complainant Address</span>
                      <textarea
                        className="complaints-textarea"
                        value={formData.complainantAddress}
                        onChange={(event) =>
                          handleFieldChange(
                            'complainantAddress',
                            event.target.value,
                          )
                        }
                      />
                    </label>

                    <label className="complaints-field complaints-field-full">
                      <span>Disputed Values As Per Latest Credit Report</span>
                      <textarea
                        className="complaints-textarea"
                        value={formData.disputedValues}
                        onChange={(event) =>
                          handleFieldChange('disputedValues', event.target.value)
                        }
                      />
                    </label>

                    <label className="complaints-field complaints-field-full">
                      <span>Correction Required</span>
                      <textarea
                        className="complaints-textarea"
                        value={formData.correctionRequired}
                        onChange={(event) =>
                          handleFieldChange('correctionRequired', event.target.value)
                        }
                      />
                    </label>

                    <label className="complaints-field">
                      <span>Account Number In Which Updation Required</span>
                      <input
                        className="complaints-input"
                        type="text"
                        value={formData.updateAccountNumber}
                        onChange={(event) =>
                          handleFieldChange('updateAccountNumber', event.target.value)
                        }
                      />
                    </label>

                    <label className="complaints-field">
                      <span>Account Number For Compensation</span>
                      <input
                        className="complaints-input"
                        type="text"
                        value={formData.compensationAccountNumber}
                        onChange={(event) =>
                          handleFieldChange(
                            'compensationAccountNumber',
                            event.target.value,
                          )
                        }
                      />
                    </label>

                    <label className="complaints-field">
                      <span>Bank Name For Compensation</span>
                      <input
                        className="complaints-input"
                        type="text"
                        value={formData.compensationBankName}
                        onChange={(event) =>
                          handleFieldChange(
                            'compensationBankName',
                            event.target.value,
                          )
                        }
                      />
                    </label>

                    <label className="complaints-field">
                      <span>Branch Name For Compensation</span>
                      <input
                        className="complaints-input"
                        type="text"
                        value={formData.compensationBranchName}
                        onChange={(event) =>
                          handleFieldChange(
                            'compensationBranchName',
                            event.target.value,
                          )
                        }
                      />
                    </label>

                    <label className="complaints-field">
                      <span>IFSC Code For Compensation</span>
                      <input
                        className="complaints-input"
                        type="text"
                        value={formData.compensationIfsc}
                        onChange={(event) =>
                          handleFieldChange('compensationIfsc', event.target.value)
                        }
                      />
                    </label>
                  </>
                ) : (
                  <label className="complaints-field complaints-field-full">
                    <span>Complaint Description</span>
                    <textarea
                      className="complaints-textarea"
                      value={formData.complaintDescription}
                      onChange={(event) =>
                        handleFieldChange('complaintDescription', event.target.value)
                      }
                    />
                  </label>
                )}

                <div className="complaints-field complaints-field-full">
                  <span className="complaints-field-label-with-note">
                    Attach Any Details
                    <small>JPG / JPEG only, 10 KB to 500 KB</small>
                  </span>

                  <label className="complaints-upload">
                    <FiUpload />
                    <span>Choose supporting file</span>
                    <input
                      className="complaints-upload-input"
                      type="file"
                      accept=".jpg,.jpeg"
                      onChange={handleFileChange}
                    />
                  </label>

                  {fileFeedback ? (
                    <div className="complaints-inline-note">{fileFeedback}</div>
                  ) : null}

                  {filePreview ? (
                    <div className="complaints-file-preview">
                      <img src={filePreview} alt="Attachment preview" />
                    </div>
                  ) : null}
                </div>
              </div>
                ) : (
                  <div className="complaints-step-locked-note">
                    <FiLock />
                    <div>
                      <strong>Step 2 is locked</strong>
                      <span>
                        Complete Step 1 and click Next to open the complaint
                        details form.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="complaints-form-actions">
              <button
                className="complaints-primary-button"
                type="submit"
                disabled={activeComplaintStep !== 2}
              >
                <FiMessageSquare />
                Submit Complaint
              </button>

              <div className="complaints-form-callout">
                <FiPhone />
                <span>
                  Need assistance before submitting? Use the Regional Office and
                  Ombudsman links above for escalation guidance.
                </span>
              </div>
            </div>

            {submitMessage ? (
              <div className="complaints-inline-note complaints-submit-note">
                <FiAlertCircle />
                <span>{submitMessage}</span>
              </div>
            ) : null}
          </form>
        </div>
      </section>

      {isStatusModalOpen ? (
        <div
          className="complaints-modal-backdrop"
          role="presentation"
          onClick={() => setIsStatusModalOpen(false)}
        >
          <div
            className="complaints-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="complaints-status-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="complaints-modal-close"
              type="button"
              aria-label="Close status popup"
              onClick={() => setIsStatusModalOpen(false)}
            >
              <FiX />
            </button>

            <div className="complaints-modal-header">
              <span className="complaints-panel-chip">Check Status</span>
              <h2 id="complaints-status-modal-title">Track your complaint ticket</h2>
              <p>
                Enter the complaint ticket ID and the registered mobile number to
                view complaint progress.
              </p>
            </div>

            <div className="complaints-modal-body">
              <label className="complaints-field">
                <span>Ticket ID</span>
                <input
                  className="complaints-input"
                  type="text"
                  value={statusForm.ticketId}
                  onChange={(event) =>
                    handleStatusFieldChange('ticketId', event.target.value)
                  }
                />
              </label>

              <label className="complaints-field">
                <span>Mobile Number</span>
                <input
                  className="complaints-input"
                  type="text"
                  value={statusForm.mobileNumber}
                  onChange={(event) =>
                    handleStatusFieldChange('mobileNumber', event.target.value)
                  }
                />
              </label>

              <button
                className="complaints-primary-button complaints-modal-button"
                type="button"
                onClick={handleStatusCheck}
              >
                <FiSearch />
                Check Status
              </button>

              {statusMessage ? (
                <div className="complaints-inline-note complaints-status-note">
                  {statusMessage}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ComplaintsPage
