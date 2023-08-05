import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function CardEditor(props) {
    const editorConfiguration = {
        toolbar: {
            items: [
                'bold',
                'italic',
                'underline',
                '|',
                'fontColor',
                'fontBackgroundColor',
                'highlight',
                '|',
                'removeFormat',
                {
                    label: 'Lists',
                    icon: false,
                    items: ['bulletedList', 'numberedList'],
                },
                '|',
                'undo',
                'redo',
            ],
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true,
            },
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
