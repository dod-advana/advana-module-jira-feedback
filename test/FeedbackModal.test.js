import React from 'react';
const assert = require('assert');
import 'regenerator-runtime/runtime';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Auth from '@dod-advana/advana-platform-ui/dist/utilities/Auth';
import FeedbackModal from '../src/lib/components/FeedbackModal'

const mock1 = jest.spyOn(Auth, "getUserDisplayName").mockReturnValue('testing user');

it("renders without crashing", () => {
  render(<FeedbackModal open={true} />);
});
