import {fireEvent, render} from '@testing-library/react';
import '../../src';
import {render as amisRender} from '../../src';
import {makeEnv, wait} from '../helper';

test('EventAction:disabled', async () => {
  const {getByText, container}: any = render(
    amisRender(
      {
        type: 'page',
        data: {
          btnDisabled: true,
          btnNotDisabled: false
        },
        body: [
          {
            type: 'action',
            label: '按钮1',
            disabledOn: '${btnDisabled}'
          },
          {
            type: 'action',
            label: '按钮2',
            disabledOn: '${btnNotDisabled}',
            onEvent: {
              click: {
                actions: [
                  {
                    actionType: 'disabled',
                    componentId: 'ui:button_test_3'
                  }
                ]
              }
            }
          },
          {
            type: 'action',
            label: '按钮3',
            disabledOn: '${btnNotDisabled}',
            id: 'ui:button_test_3'
          },
          {
            type: 'action',
            label: '按钮4',
            disabledOn: '${btnNotDisabled}',
            onEvent: {
              click: {
                actions: [
                  {
                    actionType: 'enabled',
                    componentId: 'ui:button_test_5'
                  }
                ]
              }
            }
          },
          {
            type: 'action',
            label: '按钮5',
            disabled: true,
            id: 'ui:button_test_5'
          },
          {
            type: 'action',
            label: '按钮6',
            onEvent: {
              click: {
                actions: [
                  {
                    actionType: 'disabled',
                    componentId: 'ui:form_disable'
                  }
                ]
              }
            }
          },
          {
            type: 'form',
            id: 'ui:form_disable',
            title: '表单',
            body: [
              {
                type: 'button',
                className: 'ml-2',
                label: '我的状态变了'
              }
            ]
          }
        ]
      },
      {},
      makeEnv({})
    )
  );

  fireEvent.click(getByText(/按钮2/));
  fireEvent.click(getByText(/按钮4/));
  fireEvent.click(getByText(/按钮6/));

  expect(container).toMatchSnapshot();
});

test('EventAction:disabledFormItem', async () => {
  const {getByText, container}: any = render(
    amisRender(
      {
        type: 'page',
        body: [
          {
            type: 'form',
            body: [
              {
                type: 'textarea',
                id: 'textarea',
                name: 'textarea',
                disabled: true
              }
            ]
          },
          {
            type: 'action',
            label: '启用textarea',
            onEvent: {
              click: {
                actions: [
                  {
                    actionType: 'enabled',
                    componentId: 'textarea'
                  }
                ]
              }
            }
          }
        ]
      },
      {},
      makeEnv({})
    )
  );

  expect(container.querySelector('textarea[name="textarea"]')).toBeDisabled();
  fireEvent.click(getByText(/启用textarea/));
  await wait(200);
  expect(
    container.querySelector('textarea[name="textarea"]')
  ).not.toBeDisabled();
});
