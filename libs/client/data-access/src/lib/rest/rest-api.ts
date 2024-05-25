import { API_URL } from '@nq-capital/utils-constants';
import axios, { AxiosInstance } from 'axios';


export class NqRestApi {
  private instance: AxiosInstance;

  constructor(params?: { instance?: AxiosInstance }) {
    this.instance =
      params?.instance ||
      axios.create({
        baseURL: API_URL.origin,
      });
  }

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

    return this.instance.post(`/tickets/${params.ticketId}/upload`, formData);
  }
}
