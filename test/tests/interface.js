describe('Test interface', function() {
    appendTestArea('table_editor_interface', true);
    describe('Toolbar', function () {
        describe('Popups', function () {
            it('Open popup in toolbar', function () {
                var editor = new Jodit('#table_editor_interface');
                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-video'))

                var popup = editor.container.querySelector('.jodit_toolbar_popup');

                expect(popup && popup.style.display === 'block').to.equal(true);
            });
            it('Open and close popap after clicking in another place', function() {
                var editor = new Jodit('#table_editor_interface');

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-video'))

                var popup = editor.container.querySelector('.jodit_toolbar_popup');

                expect(popup && popup.style.display === 'block').to.equal(true);

                simulateEvent('mousedown', 0, window)

                expect(popup && popup.style.display === 'none').to.equal(true);
            });
            it('Open list in toolbar', function() {
                var editor = new Jodit('#table_editor_interface');

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_with_dropdownlist'))

                var list = editor.container.querySelector('.jodit_dropdownlist');

                expect(list && list.style.display === 'block').to.equal(true);
            });
            it('Open and close list after clicking in another place', function() {
                var editor = new Jodit('#table_editor_interface');

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_with_dropdownlist'))

                var list = editor.container.querySelector('.jodit_dropdownlist');

                expect(list && list.style.display === 'block').to.equal(true);

                simulateEvent('mousedown', 0, window)

                expect(list && list.style.display === 'none').to.equal(true);
            });
            it('Open colorpicker set background and color. After this click in another any place. White when popap will be closed. Open again and remove all styles.', function() {
                var editor = new Jodit('#table_editor_interface');

                editor.setEditorValue('text2text')

                var sel = editor.win.getSelection(), range = editor.doc.createRange();

                range.setStart(editor.editor.firstChild, 3)
                range.setEnd(editor.editor.firstChild, 6)
                sel.removeAllRanges();
                sel.addRange(range)

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-brush'))

                var list = editor.container.querySelector('.jodit_toolbar_popup');

                expect(list.style.display).to.equal('block');

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-brush [data-color="#F9CB9C"]'))

                expect(editor.getEditorValue()).to.equal('tex<span style="background-color: rgb(249, 203, 156);">t2t</span>ext');

                simulateEvent('mousedown', 0, editor.editor)

                expect(list.style.display).to.equal('none');

                range.setStart(editor.editor.querySelector('span').firstChild, 1)
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range)

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-brush'))
                expect(list.style.display).to.equal('block');

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-brush .jodit_colorpicker.jodit_widget > a > svg'))
                expect(editor.getEditorValue()).to.equal('text2text');
            });
            it('Open format list set H1 for current cursor position. Restore selection after that', function() {
                var editor = new Jodit('#table_editor_interface');

                editor.setEditorValue('text2text')

                var sel = editor.win.getSelection(), range = editor.doc.createRange();

                range.setStart(editor.editor.firstChild, 3)
                range.setEnd(editor.editor.firstChild, 6)
                sel.removeAllRanges();
                sel.addRange(range)

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-paragraph'))

                var list = editor.container.querySelector('.jodit_dropdownlist');

                expect(list.style.display).to.equal('block');

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-paragraph .jodit_toolbar_btn.jodit_toolbar_btn-h1'))

                expect(editor.getEditorValue()).to.equal('<h1>text2text</h1>');

                simulateEvent('mousedown', 0, editor.editor)

                expect(list.style.display).to.equal('none');

                editor.selection.insertNode(editor.doc.createTextNode(' a '))

                expect(editor.getEditorValue()).to.equal('<h1>tex a ext</h1>');
            });
            it('Open image dialog and insert image by url.', function() {
                var editor = new Jodit('#table_editor_interface');

                editor.setEditorValue('text2text')

                var sel = editor.win.getSelection(), range = editor.doc.createRange();

                range.selectNodeContents(editor.editor.firstChild)
                range.collapse(true)
                sel.removeAllRanges();
                sel.addRange(range)

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-image'))

                var list = editor.container.querySelector('.jodit_toolbar_popup');

                expect(list.style.display).to.equal('block');

                editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-image input[name=url]').value = 'sddhttp://xdsoft.net/jodit/images/artio.jpg' // try wrong url
                editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-image input[name=text]').value = '123'
                simulateEvent('submit', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-image .jodit_form'))

                expect(editor.container.querySelectorAll('.jodit_toolbar_btn.jodit_toolbar_btn-image input[name=url].jodit_error').length).to.equal(1);

                editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-image input[name=url]').value = 'http://xdsoft.net/jodit/images/artio.jpg'
                simulateEvent('submit', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-image .jodit_form'))

                expect(sortAtrtibutes(editor.getEditorValue())).to.equal('<img alt="123" src="http://xdsoft.net/jodit/images/artio.jpg">text2text');

                simulateEvent('mousedown', 0, editor.editor)

                expect(list.style.display).to.equal('none');
            });
            it('Open video dialog and insert video by url from youtube.', function() {
                var editor = new Jodit('#table_editor_interface');

                editor.setEditorValue('')


                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-video'))

                var list = editor.container.querySelector('.jodit_toolbar_popup');

                expect(list.style.display).to.equal('block');

                editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-video input[name=code]').value = 'sddhttps://www.youtube.com/watch?v=XVYxj97Qbyk' // try wrong url
                simulateEvent('submit', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-video .jodit_form'))

                expect(editor.container.querySelectorAll('.jodit_toolbar_btn.jodit_toolbar_btn-video input[name=code].jodit_error').length).to.equal(1);

                editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-video input[name=code]').value = 'https://www.youtube.com/watch?v=XVYxj97Qbyk'
                simulateEvent('submit', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-video .jodit_form'))

                expect(sortAtrtibutes(editor.getEditorValue())).to.equal('<div class="jodit_iframe_wrapper" contenteditable="false" data-jodit-temp="1" draggable="true" style="display: block;height: 345px;width: 400px"><iframe allowfullscreen="" frameborder="0" height="345" src="//www.youtube.com/embed/XVYxj97Qbyk" width="400"></iframe></div>');

                simulateEvent('mousedown', 0, editor.editor)

                expect(list.style.display).to.equal('none');
            });
            it('Open align list and choose Right align.', function() {
                var editor = new Jodit('#table_editor_interface');

                editor.setEditorValue('Test')


                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-align'))

                var list = editor.container.querySelector('.jodit_dropdownlist');

                expect(list.style.display).to.equal('block');

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn.jodit_toolbar_btn-align .jodit_toolbar_btn.jodit_toolbar_btn-right'))


                expect(sortAtrtibutes(editor.getEditorValue())).to.equal('<p style="text-align: right">Test</p>');

                simulateEvent('mousedown', 0, editor.editor)

                expect(list.style.display).to.equal('none');
            });
        });
        describe('Buttons', function () {
            it('Remove default buttons functionality', function() {
                var editor = new Jodit('#table_editor_interface');
                expect(editor.container.querySelectorAll('.jodit_toolbar_btn-source').length).to.equal(1);
                editor.destruct();
                editor = new Jodit('#table_editor_interface', {
                    removeButtons: ['source']
                });
                expect(editor.container.querySelectorAll('.jodit_toolbar_btn-source').length).to.equal(0);
            });
            it('Add own button', function() {
                var editor = new Jodit('#table_editor_interface', {
                    buttons: Jodit.defaultOptions.buttons.concat([
                        {
                            name: 'insertDate',
                            iconURL: 'http://xdsoft.net/jodit/logo.png',
                            exec: function (data) {
                                data.editor.selection.insertHTML((new Date('2016/03/16')).toDateString());
                            }
                        }
                    ])
                });
                expect(editor.container.querySelectorAll('.jodit_toolbar_btn-insertDate').length).to.equal(1);

                editor.setEditorValue('');

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-insertDate'))
                expect(editor.getEditorValue()).to.equal('Wed Mar 16 2016');
            });
        });
        describe('Commands', function () {
            it('Click on Source button should change current mode', function() {
                var editor = new Jodit('#table_editor_interface');

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-source'))

                expect(editor.getMode()).to.equal(Jodit.MODE_SOURCE);
            });
            it('Click on Bold button should wrap current selection in <strong>', function() {
                var editor = new Jodit('#table_editor_interface');

                editor.setEditorValue('Text to text')

                var sel = editor.win.getSelection(), range = editor.doc.createRange();
                range.setStart(editor.editor.firstChild, 3)
                range.setEnd(editor.editor.firstChild, 10)
                sel.removeAllRanges();
                sel.addRange(range)

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-bold'))

                expect(editor.getEditorValue()).to.equal('Tex<strong>t to te</strong>xt');
            });
            it('Click on Italic button when selection is collapsed should create new <em> element and set cursor into it', function() {
                var editor = new Jodit('#table_editor_interface');

                editor.setEditorValue('Text to text')

                var sel = editor.win.getSelection(), range = editor.doc.createRange();
                range.setStart(editor.editor.firstChild, 0)
                range.collapse(true)
                sel.removeAllRanges();
                sel.addRange(range)

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-italic'))

                editor.selection.insertHTML('test');

                expect(editor.getEditorValue()).to.equal('<em>test</em>Text to text');
            });
            it('Click on unordered list button when selection is collapsed should wrap current box in  new <ul><li> element', function() {
                var editor = new Jodit('#table_editor_interface');

                editor.setEditorValue('<p>Text to text</p>')

                var sel = editor.win.getSelection(), range = editor.doc.createRange();

                range.setStart(editor.editor.firstChild.firstChild, 5)
                range.collapse(true)
                sel.removeAllRanges();
                sel.addRange(range)

                simulateEvent('mousedown', 0, editor.container.querySelector('.jodit_toolbar_btn-ul'))

                editor.selection.insertHTML('test ');

                expect(editor.getEditorValue()).to.equal('<ul><li>Text test to text</li></ul>');
            });
        });
    });
    after(function() {
        table_editor_interface.parentNode.removeChild(table_editor_interface);
    });
    afterEach(function () {
        var i, keys = Object.keys(Jodit.instances);
        for (i = 0; i < keys.length; i += 1) {
            Jodit.instances[keys[i]].destruct();
        }
    });
});