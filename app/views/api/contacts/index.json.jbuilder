@contacts.each do |contact|
    json.set! contact.id do
        json.extract! contact, :id, :email, :form_id, :invite_id
    end
end