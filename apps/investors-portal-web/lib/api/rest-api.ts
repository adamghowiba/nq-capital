import { API_URL } from '@nq-capital/utils-constants';
import axios from 'axios';

export const restApi = axios.create({
  baseURL: API_URL.origin,
});

export class NqRestApi {
  async uploadTicketFile(params: {
    ticketId: number;
    messageId?: number;
    files: File[];
  }) {
    const formData = new FormData();

    params.files.forEach((file) => {
      formData.append('files', file);
    });
    if (params.messageId)
      formData.append('message_id', String(params.messageId));

    return restApi.post(`/tickets/${params.ticketId}/upload`, formData);
  }
}

export const nqRestApi = new NqRestApi();
