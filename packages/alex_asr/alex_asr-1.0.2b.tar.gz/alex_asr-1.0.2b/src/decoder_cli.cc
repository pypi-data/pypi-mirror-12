//
// Created by zilka on 11/4/15.
//

#include <fstream>

#include "feat/wave-reader.h"
#include "src/decoder.h"

using namespace kaldi;
using namespace alex_asr;

int main(int argc, const char* const* argv) {
    Decoder * decoder = new Decoder(argv[2]);

    WaveData wave_data;

    std::filebuf fb;
    if (fb.open (argv[1], std::ios::in))
    {
        std::istream is(&fb);
        wave_data.Read(is);

        fb.close();
    }

    KALDI_LOG << "Initialized.";


//    int32 num_chan = wave_data.Data().NumRows(), this_chan = 0;
//    if(this_chan != num_chan -1)
//        KALDI_ERR << "Wave should have only one channel";
    SubVector<BaseFloat> waveform(wave_data.Data(), 0);

    for(int k = 0; k < 1; k++) {
        decoder->Reset();

        int32 decoded_frames = 0;
        int32 decoded_now = 0;
        int32 max_decoded = 10;



        decoder->FrameIn(&waveform);
        decoder->InputFinished();

        vector<int> words;
        float32 prob;
        do {
            decoded_frames += decoded_now;
            decoded_now = decoder->Decode(max_decoded);

            decoder->GetBestPath(&words, &prob);

            //vector<float> ivector;
            //decoder->GetIvector(&ivector);

//            std::cout << "trail_sil " << decoder->TrailingSilenceLength() << " ";
//            std::cout << "fin_cost " << decoder->FinalRelativeCost() << " ";
//            std::cout << "dec_frames " << decoder->NumFramesDecoded() << " ";

            std::cout << decoded_now << " hyp: ";
            for (int32 i = 0; i < words.size(); i++) {
                std::string s = decoder->GetWord(words[i]);
                std::cout << s << ' ';
            }

//            std::cout << " | Ivector: ";
//            for(int32 i = 0; i < ivector.size(); i++) {
//                std::cout << ivector[i] << " ";
//            }
            std::cout << std::endl;


        } while (decoded_now > 0);

        decoder->FinalizeDecoding();
    }

    std::cerr << "Done.";

    return 0;
}