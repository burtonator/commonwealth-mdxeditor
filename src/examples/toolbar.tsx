import React from 'react'
import {
  AdmonitionDirectiveDescriptor,
  MDXEditor,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  Separator,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  ListsToggle,
  KitchenSinkToolbar
} from '..'
import { ALL_PLUGINS, YoutubeDirectiveDescriptor, virtuosoSampleSandpackConfig } from './_boilerplate'
import kitchenSinkMarkdown from './assets/kitchen-sink.md?raw'
import './dark-editor.css'
import { basicDark } from 'cm6-theme-basic-dark'
import type { Story } from '@ladle/react'
import i18next from 'i18next'

export const Basics = () => {
  return <MDXEditor markdown={kitchenSinkMarkdown} plugins={ALL_PLUGINS} />
}

export const ReadOnly: Story<{ readOnly: boolean }> = ({ readOnly }) => {
  return <MDXEditor markdown={kitchenSinkMarkdown} readOnly={readOnly} plugins={ALL_PLUGINS} />
}

ReadOnly.args = { readOnly: true }
ReadOnly.argTypes = {
  readOnly: {
    name: 'Read only',
    defaultValue: true,
    control: { type: 'boolean' }
  }
}

export const CustomTheming = () => {
  return (
    <MDXEditor
      className="dark-theme dark-editor"
      markdown={kitchenSinkMarkdown}
      plugins={[
        toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin({ imageAutocompleteSuggestions: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'] }),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
        sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text', tsx: 'TypeScript' },
          codeMirrorExtensions: [basicDark]
        }),
        directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor, AdmonitionDirectiveDescriptor] }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo', codeMirrorExtensions: [basicDark] }),
        markdownShortcutPlugin()
      ]}
    />
  )
}

export const ConditionalToolbar = () => {
  return (
    <>
      <MDXEditor
        markdown={'hello world'}
        translation={(key, defaultValue, interpolations) => {
          console.log(`${key}=${defaultValue}`)
          switch (key) {
            case 'toolbar.blockTypeSelect.placeholder':
              return 'H1'
            case 'toolbar.blockTypes.heading':
              return 'P'
            case 'toolbar.blockTypes.paragraph':
              return 'P'
            default:
              return defaultValue
          }
        }}
        plugins={[
          toolbarPlugin({
            location: 'bottom',
            toolbarContents: () => (
              <>
                {/*<BlockTypeSelect />*/}
                {/*<UndoRedo />*/}
                <BoldItalicUnderlineToggles />
                <CreateLink />
                <ListsToggle />
                <Separator />
                <InsertImage />
                <div style={{ justifyContent: 'flex-end', flexGrow: 1, display: 'flex' }}>
                  <button>Go</button>
                </div>
              </>
            )
          }),
          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          // codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
          // sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
          // codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text' } }),
          directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor, AdmonitionDirectiveDescriptor] }),
          diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
          markdownShortcutPlugin()
        ]}
      />
    </>
  )
}

export const SimpleToolbar = () => {
  return (
    <MDXEditor
      markdown={'hello world'}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
            </>
          )
        }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
        sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'text' } }),
        directivesPlugin({ directiveDescriptors: [YoutubeDirectiveDescriptor, AdmonitionDirectiveDescriptor] }),
        diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
        markdownShortcutPlugin()
      ]}
    />
  )
}
