import axios from 'axios';
import { useMutation } from 'react-query';

const sendEmail = async (canvasId: string) => {
  return await axios.post('/api/graphql', {
    operationName: 'addEmailQueue',
    query: `
      mutation addEmailQueue($canvasId: String!) {
        addEmailQueue(payload: { _id: $canvasId }) {
          success
        }
      }
    `,
    variables: {
      canvasId,
    },
  });
};

export function useSendEmail() {
  return useMutation(sendEmail);
}

export default useSendEmail;
