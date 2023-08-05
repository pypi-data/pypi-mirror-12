(import sys [uuid [uuid4]] [threading [Lock]])
(import
  [HyREPL [bencode]]
  [HyREPL.ops [find-op]])


(def sessions {})


(defclass Session [object]
  [status ""
   eval-id ""
   repl None
   last-traceback None]
  (defn --init-- [self]
    (setv self.uuid (str (uuid4)))
    (assoc sessions self.uuid self)
    (setv self.lock (Lock))
    None)
  (defn --str-- [self]
    self.uuid)
  (defn --repr-- [self]
    self.uuid)
  (defn write [self msg transport]
    (assert (in "id" msg))
    (unless (in "session" msg)
      (assoc msg "session" self.uuid))
    (print "out:" msg :file sys.stderr)
    (try
      (.sendall transport (bencode.encode msg))
      (except [e OSError]
        (print (.format "Client gone: {}" e) :file sys.stderr))))
  (defn handle [self msg transport]
    (print "in:" msg :file sys.stderr)
    ((find-op (.get msg "op")) self msg transport)))
