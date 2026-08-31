import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { Resend } from 'resend';
import { generateBookingEmailHtml } from '../utils/emailTemplates';
import { sendDiscordAlert } from '../utils/notifications';

const resend = new Resend(process.env.RESEND_API_KEY);

export const onSessionBooked = onDocumentCreated(
  'session_bookings/{bookingId}',
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const data = snap.data();
    const {
      fullName = 'Student',
      email,
      bookingRef = 'BOOK-REF',
      category = '1-on-1 Mentorship',
      sessionFormat = 'virtual',
      preferredDate = 'TBD',
      preferredTimeSlot = 'Evening IST',
      institution = 'N/A',
      goals = '',
    } = data;

    // 1. Email confirmation to user
    if (process.env.RESEND_API_KEY && email) {
      try {
        const html = generateBookingEmailHtml({
          fullName,
          bookingRef,
          category,
          sessionFormat,
          preferredDate,
          preferredTimeSlot,
        });

        await resend.emails.send({
          from: 'Mentorship Desk <sessions@illuminatimun.org>',
          to: email,
          subject: `[SCHEDULED] Session Confirmed: ${bookingRef}`,
          html,
        });
      } catch (err) {
        console.error('Failed to send booking confirmation email:', err);
      }
    }

    // 2. Alert Secretariat
    await sendDiscordAlert(`📅 **New Mentorship Session Booked!**`, {
      title: `Booking Ref: ${bookingRef}`,
      color: 0x1e3a8a, // Slate navy
      fields: [
        { name: 'Name', value: fullName, inline: true },
        { name: 'Institution', value: institution, inline: true },
        { name: 'Track', value: category, inline: true },
        { name: 'Format', value: sessionFormat.toUpperCase(), inline: true },
        { name: 'Date & Time', value: `${preferredDate} (${preferredTimeSlot})`, inline: false },
        { name: 'Goals/Topics', value: goals || 'None specified', inline: false },
      ],
      timestamp: new Date().toISOString(),
    });
  }
);
