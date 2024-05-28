import {render}from '@react-email/render'
import VercelInviteUserEmail from '../emails/InvestorInvitationEmail'

export const renderEmailTemplate = () => {
  const html = render(<VercelInviteUserEmail  />, {pretty: true})

  return html
}
