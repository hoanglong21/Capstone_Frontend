import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function NoteEditor(props) {
    const editorConfiguration = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                {
                    label: 'Fonts',
                    icon: 'text',
                    items: [
                        'fontSize',
                        'fontFamily',
                        'fontColor',
                        'fontBackgroundColor',
                    ],
                },
                '|',
                'bold',
                'italic',
                'underline',
                {
                    label: 'More basic styles',
                    icon: 'threeVerticalDots',
                    items: [
                        'strikethrough',
                        'subscript',
                        'superscript',
                        '|',
                        'removeFormat',
                    ],
                },
                '|',
                'alignment',
                '|',
                {
                    // This drop-down has the icon disabled and a text label instead.
                    label: 'Lists',
                    icon: false,
                    items: [
                        'bulletedList',
                        'numberedList',
                        'outdent',
                        'indent',
                    ],
                },
                '|',
                {
                    // This drop-down has the icon disabled and a text label instead.
                    label: 'More tools',
                    icon: 'plus',
                    items: [
                        'highlight',
                        'blockQuote',
                        'specialCharacters',
                        'horizontalLine',
                        'link',
                        'insertImage',
                        'mediaEmbed',
                        'insertTable',
                    ],
                },
            ],
        },
        removePlugins: ['MediaEmbedToolbar'],
    }

    return (
        <CKEditor
            editor={Editor}
            config={editorConfiguration}
            data={props.data}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    )
}
