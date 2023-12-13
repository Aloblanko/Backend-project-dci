export function uploadController(req, res, next) {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "Bitte eine Datei auswählen" });
    }
    res.status(200).json({ message: " Datei wurde hochgeladen" });
}
