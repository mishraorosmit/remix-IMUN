/**
 * Broadsheet & Archival Dossier HTML Email Templates
 */

export interface RegistrationEmailProps {
  fullName: string;
  clearanceCode: string;
  preferredCommittee: string;
  delegationType: string;
  countryPreferences: string[];
  institution: string;
}

export function generateRegistrationEmailHtml(props: RegistrationEmailProps): string {
  const prefsList = props.countryPreferences
    .filter(Boolean)
    .map((c, i) => `<li><strong>Preference 0${i + 1}:</strong> ${c}</li>`)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; background-color: #F8F4E6; font-family: 'Georgia', serif; color: #0B192C; }
    .container { max-width: 600px; margin: 20px auto; background-color: #F8F4E6; border: 3px solid #0B192C; padding: 30px; box-shadow: 6px 6px 0px #0B192C; }
    .header { border-bottom: 2px solid #0B192C; padding-bottom: 15px; margin-bottom: 20px; text-align: center; }
    .society-name { font-size: 22px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: #0B192C; margin: 0; }
    .tagline { font-size: 11px; font-family: monospace; color: #1E3A8A; text-transform: uppercase; margin-top: 5px; }
    .dossier-box { background-color: #E6D5B8; border: 2px solid #0B192C; padding: 18px; margin: 20px 0; font-family: monospace; font-size: 13px; }
    .code-badge { background-color: #0B192C; color: #F8F4E6; padding: 4px 8px; font-weight: bold; display: inline-block; margin-top: 5px; }
    .footer { border-top: 1px solid #0B192C; margin-top: 25px; padding-top: 15px; font-size: 11px; color: #555; text-align: center; font-family: monospace; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="society-name">Illuminati International MUN Society</div>
      <div class="tagline">Official Secretariat Dispatch // Clearance Verified</div>
    </div>

    <p>Dear <strong>${props.fullName}</strong>,</p>
    <p>Your delegate dossier application has been formally received and catalogued by the Secretariat Directorate for the upcoming global convocation.</p>

    <div class="dossier-box">
      <strong>OFFICIAL DOSSIER CLEARANCE CODE:</strong><br/>
      <span class="code-badge">${props.clearanceCode}</span><br/><br/>
      <strong>CANDIDATE:</strong> ${props.fullName}<br/>
      <strong>INSTITUTION:</strong> ${props.institution}<br/>
      <strong>COMMITTEE FILED:</strong> ${props.preferredCommittee}<br/>
      <strong>DELEGATION TYPE:</strong> ${props.delegationType}<br/>
      <ul style="margin: 8px 0 0 0; padding-left: 20px;">
        ${prefsList}
      </ul>
    </div>

    <p><strong>Next Diplomatic Procedures:</strong></p>
    <ul>
      <li>Your preferences have entered the Executive Board portfolio review matrix.</li>
      <li>Official country allotments and study guide access credentials will be transmitted via this email address.</li>
      <li>Retain your Clearance Code for conference check-in and unmoderated caucus credentials.</li>
    </ul>

    <p>In diplomacy, consensus, and global leadership,</p>
    <p><strong>The Secretariat & Executive Directorate</strong><br/>Illuminati International MUN Society</p>

    <div class="footer">
      CONFIDENTIALITY NOTICE: This cable contains official MUN diplomatic communications. Ref: ${props.clearanceCode}
    </div>
  </div>
</body>
</html>
  `;
}

export interface BookingEmailProps {
  fullName: string;
  bookingRef: string;
  category: string;
  sessionFormat: string;
  preferredDate: string;
  preferredTimeSlot: string;
}

export function generateBookingEmailHtml(props: BookingEmailProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 0; background-color: #F8F4E6; font-family: 'Georgia', serif; color: #0B192C; }
    .container { max-width: 600px; margin: 20px auto; background-color: #F8F4E6; border: 3px solid #0B192C; padding: 30px; }
    .header { border-bottom: 2px solid #0B192C; padding-bottom: 15px; margin-bottom: 20px; text-align: center; }
    .dossier-box { background-color: #E6D5B8; border: 2px solid #0B192C; padding: 18px; margin: 20px 0; font-family: monospace; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0; text-transform: uppercase;">Subhrakant Biswal Mentorship Desk</h2>
      <div style="font-family: monospace; font-size: 11px; color: #1E3A8A;">Strategic Diplomatic Consultation</div>
    </div>

    <p>Hello <strong>${props.fullName}</strong>,</p>
    <p>Your session reservation has been scheduled with the Mentorship Desk.</p>

    <div class="dossier-box">
      <strong>BOOKING REFERENCE:</strong> ${props.bookingRef}<br/>
      <strong>SESSION TRACK:</strong> ${props.category}<br/>
      <strong>FORMAT:</strong> ${props.sessionFormat.toUpperCase()}<br/>
      <strong>SCHEDULED DATE:</strong> ${props.preferredDate}<br/>
      <strong>TIME WINDOW:</strong> ${props.preferredTimeSlot}
    </div>

    <p>Our academic coordinator will send the virtual meeting link and strategic prep dossier 24 hours prior to the call.</p>
    <p>Best regards,<br/><strong>Mentorship & Training Directorate</strong></p>
  </div>
</body>
</html>
  `;
}
