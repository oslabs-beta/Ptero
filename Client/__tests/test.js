import Counter from './Counter.svelte'
import { render, fireEvent } from '@testing-library/svelte'

it('it works', async () => {
  const { getByText, getByTestId } = render(Counter)

  const increment = getByText('increment')
  const decrement = getByText('decrement')
  const counter = getByTestId('counter-value')

  await fireEvent.click(increment)
  await fireEvent.click(increment)
  await fireEvent.click(increment)
  await fireEvent.click(decrement)

  expect(counter.textContent).toBe('2')

  // with jest-dom
  expect(counter).toHaveTextContent('2')
})


// test that routes work on the header

// testing for settings page
  //connection settings test
    // test for refresh button
    if('refresh button refreshes the logs page', async() => {
      const button = <button id="refreshButton" on:click={fetchLogs}>Refresh</button>;
      const { getByText, getByTestId } = render(button)

      // functional stuff?
      const refresh = getByText('refresh')
      const counter = getByTestId('refresh-counter')

      await fireEvent.click(button);
      await fireEvent.click(button);
      //expect content type of fetch request to be json-blah
      expect(counter)
      expect(refresh).toHaveTextContent('2')
    })





    // test for the "BackEnd Address"
    // test for "API key"
  //redis settings test 
    // time to leave update tests