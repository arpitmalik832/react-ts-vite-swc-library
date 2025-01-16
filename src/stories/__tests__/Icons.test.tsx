/**
 * Unit tests for Icons component.
 * @file This file is saved as `Icons.test.jsx`.
 */
import React from 'react';
import {
  render,
  fireEvent,
  act,
  Matcher,
  ByRoleMatcher,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Icons from '../Icons';
import { copyToClipboard } from '../../utils/commonUtils';

jest.mock('../../../static/enums/icons_list.mjs', () => ({
  __esModule: true,
  default: [
    'lg32/standardAccount.svg',
    'rg24/systemActionABCKeypad.svg',
    'sm16/systemAdd.svg',
  ],
}));

// Mock the commonUtils
jest.mock('../../utils/commonUtils', () => ({
  copyToClipboard: jest.fn(),
}));

// Mock the logsUtils
jest.mock('../../utils/logsUtils', () => ({
  log: jest.fn(),
  errorLog: jest.fn(),
}));

// Mock dynamic imports for icons
jest.mock(
  '../../assets/icons/lg32/standardAccount.svg',
  () => ({
    ReactComponent: () => <div data-testid="mock-icon">Icon1</div>,
  }),
  { virtual: true },
);

jest.mock(
  '../../assets/icons/rg24/systemActionABCKeypad.svg',
  () => ({
    ReactComponent: () => <div data-testid="mock-icon">Icon2</div>,
  }),
  { virtual: true },
);

jest.mock(
  '../../assets/icons/sm16/systemAdd.svg',
  () => ({
    ReactComponent: () => <div data-testid="mock-icon">Icon3</div>,
  }),
  { virtual: true },
);

describe('Icons Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    let getAllByTestId: ((id: Matcher) => HTMLElement[]) | undefined;

    act(() => {
      const rendered = render(<Icons />);
      getAllByTestId = rendered.getAllByTestId;
    });

    if (typeof getAllByTestId === 'function') {
      expect(getAllByTestId('icon-box')?.length).toBe(3);
    }
  });

  describe('Icon sections', () => {
    it('renders all size sections', () => {
      let getByText: ((text: string) => HTMLElement) | undefined;
      act(() => {
        const rendered = render(<Icons />);
        getByText = rendered.getByText;
      });
      if (typeof getByText === 'function') {
        expect(getByText('sm16')).toBeInTheDocument();
        expect(getByText('rg24')).toBeInTheDocument();
        expect(getByText('lg32')).toBeInTheDocument();
      }
    });
  });

  describe('Icon component', () => {
    it('handles successful icon loading', () => {
      act(() => {
        render(<Icons />);
      });
    });

    it('handles icon loading errors', () => {
      const mockModule: { default: string[] } = jest.requireMock(
        '../../../static/enums/icons_list.mjs',
      );
      const originalIconsList: string[] = mockModule.default || [];
      mockModule.default = ['lg32/abc.svg', 'rg24/abc.svg', 'sm16/abc.svg'];

      act(() => {
        render(<Icons />);
      });

      // Restore the original icons list
      mockModule.default = originalIconsList;
    });
  });

  describe('Modal functionality', () => {
    it('opens modal when icon is clicked', () => {
      let getAllByTestId: ((id: Matcher) => HTMLElement[]) | undefined;
      let getByTestId: ((id: Matcher) => HTMLElement) | undefined;
      act(() => {
        const rendered = render(<Icons />);
        getAllByTestId = rendered.getAllByTestId;
        getByTestId = rendered.getByTestId;
      });

      if (
        typeof getAllByTestId === 'function' &&
        typeof getByTestId === 'function'
      ) {
        const iconBox = getAllByTestId('icon-box')[0];
        act(() => {
          fireEvent.click(iconBox);
        });
        expect(getByTestId('icon-modal')).toBeInTheDocument();
      }
    });

    it('closes modal when backdrop is clicked', () => {
      let getAllByTestId: ((id: Matcher) => HTMLElement[]) | undefined;
      let getByTestId: ((id: Matcher) => HTMLElement) | undefined;
      let queryByTestId: ((id: Matcher) => HTMLElement | null) | undefined;
      act(() => {
        const rendered = render(<Icons />);
        getAllByTestId = rendered.getAllByTestId;
        getByTestId = rendered.getByTestId;
        queryByTestId = rendered.queryByTestId;
      });

      if (
        typeof getAllByTestId === 'function' &&
        typeof getByTestId === 'function' &&
        typeof queryByTestId === 'function'
      ) {
        const iconBox = getAllByTestId('icon-box')[0];
        act(() => {
          fireEvent.click(iconBox);
        });
        const backdrop = getByTestId('backdrop');
        act(() => {
          fireEvent.click(backdrop);
        });
        expect(queryByTestId('icon-modal')).not.toBeInTheDocument();
      }
    });

    it('closes modal when close button is clicked', () => {
      let getAllByTestId: ((id: Matcher) => HTMLElement[]) | undefined;
      let getByTestId: ((id: Matcher) => HTMLElement) | undefined;
      let queryByTestId: ((id: Matcher) => HTMLElement | null) | undefined;
      act(() => {
        const rendered = render(<Icons />);
        getAllByTestId = rendered.getAllByTestId;
        getByTestId = rendered.getByTestId;
        queryByTestId = rendered.queryByTestId;
      });

      if (
        typeof getAllByTestId === 'function' &&
        typeof getByTestId === 'function' &&
        typeof queryByTestId === 'function'
      ) {
        const iconBox = getAllByTestId('icon-box')[0];
        act(() => {
          fireEvent.click(iconBox);
        });
        const closeButton = getByTestId('close-icon');
        act(() => {
          fireEvent.click(closeButton);
        });
        expect(queryByTestId('icon-modal')).not.toBeInTheDocument();
      }
    });

    it('handles keyboard navigation', () => {
      let getAllByTestId: ((id: Matcher) => HTMLElement[]) | undefined;
      let getByTestId: ((id: Matcher) => HTMLElement) | undefined;
      let queryByTestId: ((id: Matcher) => HTMLElement | null) | undefined;
      act(() => {
        const rendered = render(<Icons />);
        getAllByTestId = rendered.getAllByTestId;
        getByTestId = rendered.getByTestId;
        queryByTestId = rendered.queryByTestId;
      });

      if (
        typeof getAllByTestId === 'function' &&
        typeof getByTestId === 'function' &&
        typeof queryByTestId === 'function'
      ) {
        const iconBox = getAllByTestId('icon-box')[0];
        act(() => {
          fireEvent.keyDown(iconBox, { key: ' ' });
        });
        act(() => {
          fireEvent.keyDown(iconBox, { key: 'A' });
        });
        expect(getByTestId('icon-modal')).toBeInTheDocument();

        const copyButton = getByTestId('copy-icon');
        act(() => {
          fireEvent.keyDown(copyButton, { key: ' ' });
        });
        act(() => {
          fireEvent.keyDown(copyButton, { key: 'A' });
        });
        expect(copyToClipboard).toHaveBeenCalled();

        const closeButton = getByTestId('close-icon');
        act(() => {
          fireEvent.keyDown(closeButton, { key: 'A' });
        });
        act(() => {
          fireEvent.keyDown(closeButton, { key: ' ' });
        });
        expect(queryByTestId('icon-modal')).not.toBeInTheDocument();

        act(() => {
          fireEvent.keyDown(iconBox, { key: ' ' });
        });
        act(() => {
          fireEvent.keyDown(iconBox, { key: 'A' });
        });
        expect(getByTestId('icon-modal')).toBeInTheDocument();

        const backdrop = getByTestId('backdrop');
        act(() => {
          fireEvent.keyDown(backdrop, { key: 'A' });
        });
        act(() => {
          fireEvent.keyDown(backdrop, { key: ' ' });
        });
        expect(queryByTestId('icon-modal')).not.toBeInTheDocument();
      }
    });
  });

  describe('Copy functionality', () => {
    it('copies import path when copy button is clicked', () => {
      let getAllByTestId: ((id: Matcher) => HTMLElement[]) | undefined;
      let getByTestId: ((id: Matcher) => HTMLElement) | undefined;
      act(() => {
        const rendered = render(<Icons />);
        getAllByTestId = rendered.getAllByTestId;
        getByTestId = rendered.getByTestId;
      });

      if (
        typeof getAllByTestId === 'function' &&
        typeof getByTestId === 'function'
      ) {
        const iconBox = getAllByTestId('icon-box')[0];
        act(() => {
          fireEvent.click(iconBox);
        });
        const copyButton = getByTestId('copy-icon');
        act(() => {
          fireEvent.click(copyButton);
        });
        expect(copyToClipboard).toHaveBeenCalled();
      }
    });

    it('generates correct import path', () => {
      let getAllByTestId: ((id: Matcher) => HTMLElement[]) | undefined;
      let getByTestId: ((id: Matcher) => HTMLElement) | undefined;
      act(() => {
        const rendered = render(<Icons />);
        getAllByTestId = rendered.getAllByTestId;
        getByTestId = rendered.getByTestId;
      });

      if (
        typeof getAllByTestId === 'function' &&
        typeof getByTestId === 'function'
      ) {
        const iconBox = getAllByTestId('icon-box')[0];
        act(() => {
          fireEvent.click(iconBox);
        });
        const codeElement = getByTestId('code-element');
        expect(codeElement.textContent).toMatch(
          /import { ReactComponent as [A-Z][a-zA-Z]+ } from 'library_name\/icons\/.+'/,
        );
      }
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      let getAllByRole: ((role: ByRoleMatcher) => HTMLElement[]) | undefined;
      act(() => {
        const rendered = render(<Icons />);
        getAllByRole = rendered.getAllByRole;
      });
      if (typeof getAllByRole === 'function') {
        const buttons = getAllByRole('button');
        buttons.forEach(button => {
          expect(button).toHaveAttribute('aria-pressed');
          expect(button).toHaveAttribute('tabIndex');
        });
      }
    });

    it('handles keyboard interactions', () => {
      let getAllByTestId: ((id: Matcher) => HTMLElement[]) | undefined;
      let getByTestId: ((id: Matcher) => HTMLElement) | undefined;
      let queryByTestId: ((id: Matcher) => HTMLElement | null) | undefined;
      act(() => {
        const rendered = render(<Icons />);
        getAllByTestId = rendered.getAllByTestId;
        getByTestId = rendered.getByTestId;
        queryByTestId = rendered.queryByTestId;
      });

      if (
        typeof getAllByTestId === 'function' &&
        typeof getByTestId === 'function' &&
        typeof queryByTestId === 'function'
      ) {
        const iconBox = getAllByTestId('icon-box')[0];

        // Test Enter key
        act(() => {
          fireEvent.keyDown(iconBox, { key: 'Enter' });
        });
        act(() => {
          fireEvent.keyDown(iconBox, { key: 'A' });
        });
        expect(getByTestId('icon-modal')).toBeInTheDocument();

        // Test Space key
        const closeButton = getByTestId('close-icon');
        act(() => {
          fireEvent.keyDown(closeButton, { key: ' ' });
        });
        act(() => {
          fireEvent.keyDown(closeButton, { key: 'A' });
        });
        expect(queryByTestId('icon-modal')).not.toBeInTheDocument();
      }
    });
  });
});
