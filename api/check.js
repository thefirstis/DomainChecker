module.exports = async (req, res) => {
    const fetch = (await import('node-fetch')).default;
    const { domain } = req.query;
    const [name, suffix] = domain.split('.');

    try {
        const apiResponse = await fetch(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
        if (!apiResponse.ok) {
            throw new Error('API request failed');
        }
        const data = await apiResponse.json();
        const message = data.available ? 'The domain name is not registered !' : '域The domain name has been registered !';
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ message: 'Unable to check domain name' });
    }
};
