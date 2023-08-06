(require processor.utils.macro)


(defn create-note [key]
  (import-or-error [closeio_api [Client]]
                   "Please, install 'closeio' library to use 'closeio.create_note' output.")
  (setv api (Client key))
  
  (fn [&optional item]
    (apply api.post ["activity/note"] {"data" item})
    None))
  
