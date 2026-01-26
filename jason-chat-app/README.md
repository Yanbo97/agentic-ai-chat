# JasonChatApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# chat app creation prompt
Create an HTML template for a modern, dark-themed chat UI using Angular and Tailwind CSS.
The layout should be a full-screen, single-column chat window with a very dark background and large rounded corners.
Key features:
Framework: Use Angular's new @for/@if control flow and manage state with Signals (history(), loading(), error(), message()).
Header: Include a teal chat icon, a main title "Jason AI Chat", and a subtitle "Your AI assistant".
Chat History:
Display a list of messages from the history() signal in a scrollable area.
User messages should be on the right with a teal background.
Bot messages should be on the left with a gray background.
Show a pulsing "Bot is typing..." indicator on the left when the loading() signal is true after a user message, and at its bottom show a skeleton text.
Display a "start the conversation" message when the history is empty.
Make the design responsive in all devices

Input Form:
A rounded text input field bound to a message() signal.
A circular, teal send button with a paper plane icon.
The form should be disabled when loading() is true.

Note: make changes in chat component already created within app folder, tailwind css and bootstrap icons are already integrated. Follow angular standalone approach for latest version
