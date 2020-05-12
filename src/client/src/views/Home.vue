<template>
    <div>
        <audio controls id="remoteAudioPlayback" />
        <video controls id="remoteVideoPlayback" />
    </div>
</template>

<script>
import CallService from "@/services/callservice/CallService";

export default {
    name: "Home"
};
</script>
