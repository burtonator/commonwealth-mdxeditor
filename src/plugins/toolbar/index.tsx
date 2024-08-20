import { realmPlugin } from '../../RealmWithPlugins'
import { Cell, useCellValues } from '@mdxeditor/gurx'
import React from 'react'
import {addBottomAreaChild$, addTopAreaChild$, readOnly$} from '../core'
import { Root } from './primitives/toolbar'

/**
 * The factory function that returns the contents of the toolbar.
 * @group Toolbar
 */
export const toolbarContents$ = Cell<() => React.ReactNode>(() => null)

const DEFAULT_TOOLBAR_CONTENTS = () => {
  return 'This is an empty toolbar. Pass `{toolbarContents: () => { return <>toolbar components</> }}` to the toolbarPlugin to customize it.'
}

type ToolbarPluginProps = Readonly<{
  toolbarContents: () => React.ReactNode

  /**
   * Where to place the toolbar (top or bottom of editor)
   */
  location?: 'top' | 'bottom'
}>

/**
 * A plugin that adds a toolbar to the editor.
 * @group Toolbar
 */
export const toolbarPlugin = realmPlugin<ToolbarPluginProps>({
  init(realm, params) {
    realm.pubIn({
      [toolbarContents$]: params?.toolbarContents ?? DEFAULT_TOOLBAR_CONTENTS,
      [addTopAreaChild$]: () => {
        return params?.location === undefined || params.location === 'top' ? <ToolbarBody/> : null
      },
      [addBottomAreaChild$]: () => {
        return params?.location === 'bottom' ? <ToolbarBody/> : null
      }
    })
  },
  update(realm, params) {
    realm.pub(toolbarContents$, params?.toolbarContents ?? DEFAULT_TOOLBAR_CONTENTS)
  }
})

const ToolbarBody = () => {
  const [toolbarContents, readOnly] = useCellValues(toolbarContents$, readOnly$)
  return <Root readOnly={readOnly}>{toolbarContents()}</Root>
}
